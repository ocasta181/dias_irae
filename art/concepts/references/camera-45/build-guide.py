from pathlib import Path
from math import sin, cos, pi, radians, sqrt
import json
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).parent
FACES = []

def sub(a,b): return tuple(a[i]-b[i] for i in range(3))
def cross(a,b): return (a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0])
def dot(a,b): return sum(x*y for x,y in zip(a,b))
def unit(a):
    l=sqrt(dot(a,a)); return tuple(x/l for x in a)

def face(points,color,normal=None):
    n=normal or unit(cross(sub(points[1],points[0]),sub(points[2],points[0])))
    FACES.append((points,color,n))

def box(center,size,color):
    x,y,z=center;dx,dy,dz=(v/2 for v in size)
    pts=[(x+sx*dx,y+sy*dy,z+sz*dz) for sx,sy,sz in [(-1,-1,-1),(1,-1,-1),(1,1,-1),(-1,1,-1),(-1,-1,1),(1,-1,1),(1,1,1),(-1,1,1)]]
    for ids in [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]:face([pts[i] for i in ids],color)

def cylinder(x,y,z0,z1,rx,ry,color,n=96,angles=None):
    low=[(x+rx*cos(2*pi*i/n),y+ry*sin(2*pi*i/n),z0) for i in range(n)]
    high=[(a,b,z1) for a,b,_ in low]
    for i in range(n):
        angle=2*pi*(i+.5)/n
        col=color(angle) if callable(color) else color
        if angles is not None and not angles(angle): continue
        face([low[i],low[(i+1)%n],high[(i+1)%n],high[i]],col)
    if angles is None:
        cap=color(0) if callable(color) else color
        face(high,tuple(min(255,int(v*1.16)) for v in cap),(0,0,1))

def ellipsoid(center,radii,color,n=24,m=12):
    x,y,z=center;rx,ry,rz=radii
    def p(i,j):
        ph=-pi/2+pi*j/m;t=2*pi*i/n
        return (x+rx*cos(ph)*cos(t),y+ry*cos(ph)*sin(t),z+rz*sin(ph))
    for j in range(m):
        for i in range(n):
            points=[p(i,j),p(i+1,j),p(i+1,j+1),p(i,j+1)]
            center=tuple(sum(q[k] for q in points)/4 for k in range(3))
            normal=unit(((center[0]-x)/rx**2,(center[1]-y)/ry**2,(center[2]-z)/rz**2))
            face(points,color,normal)

iron=(96,94,85);wine=(92,37,42);leather=(94,73,52);mail=(70,73,70);wood=(119,104,82)
for y in [-.24,.24]:
    ellipsoid((.29,y,.12),(.31,.20,.12),leather)
    cylinder(.12,y,.18,.55,.145,.14,leather)
    for z in [.22,.30,.38,.46]: cylinder(.12,y,z,z+.03,.15,.146,(116,98,76))
box((-.06,0,.84),(.67,.73,.72),mail)
box((-.06,0,.67),(.73,.76,.32),wine)
box((-.025,0,.78),(.77,.80,.09),leather)
box((.372,-.09,.78),(.045,.18,.11),iron)
for y in [-.48,.48]:
    ellipsoid((-.04,y,1.04),(.20,.18,.22),mail)
    cylinder(.08,y,.60,.94,.125,.13,leather)
    for z in [.64,.72,.80,.88]:cylinder(.08,y,z,z+.025,.13,.136,(117,99,79))
    ellipsoid((.17,y,.58),(.16,.15,.15),leather)
face([(-.44,-.31,1.23),(-.45,.31,1.23),(-.57,.53,.25),(-.52,-.40,.32)],wine,(-1,0,0))
cylinder(-.05,0,1.13,1.30,.46,.49,wine)
cylinder(-.05,0,1.23,2.30,.63,.63,iron)
for center in [-.65,.60]:
    cylinder(-.05,0,1.25,2.28,.636,.636,(115,111,99),angles=lambda a,c=center:abs((a-c+pi)%(2*pi)-pi)<.047)
cylinder(-.05,0,1.74,1.80,.64,.64,(15,17,16),angles=lambda a:abs((a+.15+pi)%(2*pi)-pi)<1.12)
for a in [-.55,-.18,.19]:
    for z in [1.45,1.56]:
        x=-.05+.641*cos(a);y=.641*sin(a)
        face([(x,y-.025,z-.023),(x,y+.025,z-.023),(x,y+.025,z+.023),(x,y-.025,z+.023)],(20,22,21),(cos(a),sin(a),0))
shield=[(.13,1.20),(-.32,1.16),(-.38,.78),(0,.17),(.38,.78),(.32,1.16)]
def shield_points(scale,offset=0):return [(.30+.30*h*scale+offset,.83+.8*h*scale,.17+(z-.17)*scale) for h,z in shield]
face(shield_points(1.06),iron,(.8,-.3,0))
face(shield_points(.94,.012),wood,(.8,-.3,0))
face([(.317,.78,1.12),(.357,.89,1.13),(.374,.88,.33),(.32,.79,.29)],wine,(.8,-.3,0))
hilt=(.17,-.58,.58);tip=(1.05,.41,.03)
d=unit(sub(tip,hilt));side=unit(cross(d,(0,0,1)));h=tuple(hilt[i]+d[i]*.13 for i in range(3))
face([tuple(h[i]+side[i]*.08 for i in range(3)),tuple(h[i]-side[i]*.08 for i in range(3)),tip],(155,154,138),(0,0,1))
box(hilt,(.12,.10,.12),leather)
face([tuple(hilt[i]+side[i]*.26 for i in range(3)),tuple(hilt[i]-side[i]*.26 for i in range(3)),tuple(hilt[i]-side[i]*.26+d[i]*.045 for i in range(3)),tuple(hilt[i]+side[i]*.26+d[i]*.045 for i in range(3))],iron,(0,0,1))

light=unit((-.4,-.8,1.8))
def render(elevation):
    el=radians(elevation);az=radians(-55)
    view=(cos(el)*cos(az),cos(el)*sin(az),sin(el))
    right=(-sin(az),cos(az),0);up=(-sin(el)*cos(az),-sin(el)*sin(az),cos(el))
    projected=[(dot(p,right),dot(p,up)) for points,_,_ in FACES for p in points]
    xmin=min(p[0] for p in projected);xmax=max(p[0] for p in projected);ymin=min(p[1] for p in projected);ymax=max(p[1] for p in projected)
    scale=min(780/(xmax-xmin),790/(ymax-ymin))
    def project(p):return (512+(dot(p,right)-(xmin+xmax)/2)*scale,505-(dot(p,up)-(ymin+ymax)/2)*scale)
    image=Image.new('RGB',(1024,1024),(30,32,30));draw=ImageDraw.Draw(image)
    for points,color,normal in sorted(FACES,key=lambda f:sum(dot(p,view) for p in f[0])/len(f[0])):
        if dot(normal,view)<0:continue
        brightness=.65+.35*max(0,dot(normal,light));color=tuple(int(v*brightness) for v in color)
        draw.polygon([project(p) for p in points],fill=color)
    image.save(ROOT/f'camera-{elevation}-guide.png')
    return image
before=render(30);after=render(45)
render(60)
canvas=Image.new('RGB',(2048,1100),(27,29,27));canvas.paste(before,(0,65));canvas.paste(after,(1024,65))
draw=ImageDraw.Draw(canvas);font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',30)
draw.text((25,18),'Geometry guide only: 30 degrees',fill=(223,220,207),font=font);draw.text((1049,18),'Same geometry: 45 degrees (+15)',fill=(223,220,207),font=font)
canvas.save(ROOT/'camera-comparison.png')
(ROOT/'projection.json').write_text(json.dumps({'purpose':'Deterministic composition guide, not a game concept or historical object.','projection':'orthographic','before_degrees_above_ground':30,'after_degrees_above_ground':45,'delta_degrees':15,'azimuth_degrees':-55,'crown_plane':'horizontal','cylinder_axis':'vertical','before_crown_minor_major_ratio':sin(radians(30)),'after_crown_minor_major_ratio':sin(radians(45)),'previous_illustration_elevation':'Approximately 30 degrees; not certified geometry.','geometry_changes_between_views':None},indent=2)+'\n')
print('Rendered one fixed proxy at 30 and 45 degrees; crown ratio 0.5000 -> 0.7071.')

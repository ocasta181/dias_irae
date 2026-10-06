import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url), { createCanvas, loadImage } = require(process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas");
const root = new URL("walk-v07/", import.meta.url), output = new URL("walk-v08/", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("manifest.json", root)));
const vectors = { N:[0,-1], NE:[1,-1], E:[1,0], SE:[1,1], S:[0,1], SW:[-1,1], W:[-1,0], NW:[-1,-1] };
const near = { N:["LH","RH"], NE:["LH","RH","RF"], E:["RH","RF"], SE:["RH","RF","LF"], S:["LF","RF"], SW:["LH","LF","RF"], W:["LH","LF"], NW:["RH","LH","LF"] };
const views = { N:"strict rear view facing NORTH/up, body horizontal on all fours; no face or eyes", NE:"rear three-quarter facing upper right", E:"right-facing elevated profile", SE:"front three-quarter facing lower right", S:"front view facing toward the viewer at screen bottom", SW:"front three-quarter facing lower left", W:"left-facing elevated profile", NW:"rear three-quarter facing upper left" };
await mkdir(new URL("controls/",output),{recursive:true}); await mkdir(new URL("requests/",output),{recursive:true});
const canonical = await loadImage(await readFile(new URL("canonical-crop.png",root))), patch = createCanvas(120,120);
patch.getContext("2d").drawImage(canonical,350,360,120,120,0,0,120,120);
const records = [];
for (const [direction,page] of Object.entries(manifest.directions)) {
  const v=vectors[direction],length=Math.hypot(...v),[dx,dy]=v.map(n=>n/length);
  const fx=24*dx,fy=24*dy*Math.SQRT1_2,lx=-16*dy,ly=16*dx*Math.SQRT1_2;
  const xx=fx*fx+lx*lx,yy=fy*fy+ly*ly+32,xy=fx*fy+lx*ly,disc=Math.hypot(xx-yy,2*xy);
  const rx=Math.sqrt((xx+yy+disc)/2),ry=Math.sqrt((xx+yy-disc)/2),rotation=.5*Math.atan2(2*xy,xx-yy);
  for(const [index,p] of page.frames.entries()) {
    const c=createCanvas(768,768),a=c.getContext("2d");a.fillStyle="white";a.fillRect(0,0,768,768);a.save();a.scale(6,6);a.translate(-32,-56);a.fillStyle="#756a5b";a.strokeStyle="#756a5b";a.lineCap="round";a.lineJoin="round";
    const leg=f=>{a.save();a.beginPath();a.rect(32,56,128,f.points[3][1]-56);a.clip();for(let i=1;i<4;i++){const end=i===3?[f.points[3][0],f.points[3][1]-2]:f.points[i];a.beginPath();a.moveTo(...f.points[i-1]);a.lineTo(...end);a.lineWidth=i===1?6:i===2?4.5:3;a.stroke();}const q=f.points[3];a.beginPath();a.ellipse(q[0],q[1]-2,3.5,2,0,0,Math.PI*2);a.fill();a.restore();};
    Object.values(p.feet).forEach(leg);
    const tip=p.guideLines[0][0],base=p.guideLines[0][1];a.beginPath();a.moveTo(base[0]-5,base[1]);a.lineTo(tip[0]-3,tip[1]+2);a.lineTo(tip[0],tip[1]+3);a.lineTo(tip[0]+3,tip[1]);a.lineTo(base[0]+5,base[1]);a.closePath();a.fill();
    a.beginPath();a.ellipse(96,140.44365081389594,rx,ry,rotation,0,Math.PI*2);a.fill();const h=p.guideLines[2][1];a.beginPath();a.ellipse(h[0],h[1],24,20,0,0,Math.PI*2);a.fill();
    for(const offset of [-14,14]){const x=h[0]+offset;a.beginPath();a.moveTo(x-7,h[1]-8);a.lineTo(x,h[1]-32);a.lineTo(x+7,h[1]-10);a.closePath();a.fill();}
    if(!["N","NE","NW"].includes(direction)){const nose=p.guideLines[2][2];a.beginPath();a.ellipse(nose[0]-dx*3,nose[1]-dy*3,8,6,Math.atan2(dy,dx),0,Math.PI*2);a.fill();}
    near[direction].forEach(id=>leg(p.feet[id]));a.restore();
    const pixels=a.getImageData(0,0,768,768);for(let i=0;i<pixels.data.length;i+=4)pixels.data[i+3]=Math.max(0,Math.min(255,Math.round((255-pixels.data[i])*255/(255-117))));a.putImageData(pixels,0,0);a.globalCompositeOperation="source-in";a.fillStyle=a.createPattern(patch,"repeat");a.fillRect(0,0,768,768);a.globalCompositeOperation="destination-over";a.fillStyle="white";a.fillRect(0,0,768,768);a.globalCompositeOperation="source-over";
    const ids=near[direction].filter(id=>{const q=p.feet[id].points[3];return ((q[0]-h[0])/24)**2+((q[1]-h[1])/20)**2>1.05;});
    a.strokeStyle="#00ffff";a.lineWidth=3;for(const name of ids){const q=p.feet[name].points[3],x=(q[0]-32)*6,y=(q[1]-56)*6;a.beginPath();a.moveTo(x-7,y);a.lineTo(x+7,y);a.moveTo(x,y-7);a.lineTo(x,y+7);a.stroke();}
    const id=direction+"-walk-v08-"+String(index+1).padStart(2,"0"),path=new URL("controls/"+id+".png",output);await writeFile(path,c.toBuffer("image/png"));
    const positions=ids.map(name=>{const f=p.feet[name],q=f.points[3];return name+": ("+(q[0]-32).toFixed(6)+","+(q[1]-56).toFixed(6)+") "+(f.planted?"planted":"swing; raised "+f.lift.toFixed(3));}).join("; ");
    const prompt="Use case: precise-object-edit. Finish this ONE pose-shaped texture control into one intact whole-body wolf sprite, pose "+(index+1)+"/12 in "+views[direction]+". This single input uses the original canonical wolf fur and approved skeletal geometry, not a prior failed painting. Refine its repeating fur seams into coherent grey-brown matte dry-painted 2D game art while preserving the exact silhouette layout, huge broad head, tiny squat torso, very short limbs, small weary eyes where visible, coat texture grammar and the 45-degree elevated orthographic camera. The animal stays horizontal on all fours, not an upright creature. No realistic lanky proportions, anime eyes, 3D shading, cast shadow, extra limbs, words or separated parts.\nThe CYAN marks are paw UNDERSIDE/BOTTOM CONTACT EDGE MIDPOINTS. Keep those contacts exactly in place: "+positions+", in the ENTIRE 128-square canvas. Keep proper canine shoulder/elbow/carpus/paw and hip/stifle/raised-hock/paw anatomy, tiny furry paws/claws and no visible underside pads or decorative joint circles. Preserve the given bent limb poses; do not shorten, recenter, zoom or substitute a generic stand. Hidden limbs may occlude naturally. The pointed shape connected at the rump is the furry tail, not a leg. Preserve whole-canvas registration and scale. Remove all marks and the background; output genuine alpha transparency. Draw one complete connected wolf only, not a sheet.";
    const args={prompt,referenced_image_paths:[fileURLToPath(path)],transparent_background:true};
    await writeFile(new URL("requests/"+id+".json",output),JSON.stringify(args,null,2)+"\n");records.push({id,direction,index:index+1,sourcePoseId:p.id,control:fileURLToPath(path),request:"requests/"+id+".json",markerIds:ids,status:"pending"});
  }
}
await writeFile(new URL("manifest.json",output),JSON.stringify({source:"../walk-v07/manifest.json",fps:12,cycleMs:1000,frames:records,skinFramesComplete:0},null,2)+"\n");console.log(JSON.stringify({controls:records.length,directions:8,paintedSheetsComplete:0}));


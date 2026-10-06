import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const require = createRequire(import.meta.url);
const { createCanvas, loadImage } = require(process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas");
const root = new URL("walk-v10/", import.meta.url), prior = new URL("walk-v07/", import.meta.url);
const source = JSON.parse(await readFile(new URL("manifest.json", prior)));
const canonicalBytes = await readFile(source.identity.crop), canonical = await loadImage(canonicalBytes);
const registered = await loadImage(await readFile(source.identity.canonical));
const vectors = { N:[0,-1], NE:[1,-1], E:[1,0], SE:[1,1], S:[0,1] };
const views = { N:"rear, looking away toward screen top; no face visible", NE:"rear three-quarter, looking upper-right", E:"elevated right profile", SE:"front three-quarter, looking lower-right", S:"front, looking toward screen bottom" };
const near = { N:["LH","RH"], NE:["LH","RH","RF"], E:["RH","RF"], SE:["RH","RF","LF"], S:["LF","RF"] };
for (const directory of ["controls/", "guides/", "requests/", "raw/", "frames/", "sheets/"]) await mkdir(new URL(directory, root), { recursive:true });
const pages = [];
for (const [direction, vector] of Object.entries(vectors)) {
  const length = Math.hypot(...vector), [dx,dy] = vector.map(value => value / length);
  const project = (forward, lateral, height) => [96 + dx*forward - dy*lateral, 156 + Math.SQRT1_2*(dy*forward + dx*lateral - height)];
  const ellipse = (a, forward, height, rf, rl, rh) => {
    const [x,y] = project(forward,0,height), xx=(dx*rf)**2+(dy*rl)**2, yy=.5*((dy*rf)**2+(dx*rl)**2+rh*rh), xy=.5**.5*dx*dy*(rf*rf-rl*rl), disc=Math.hypot(xx-yy,2*xy);
    a.beginPath(); a.ellipse(x,y,Math.sqrt((xx+yy+disc)/2),Math.sqrt((xx+yy-disc)/2),.5*Math.atan2(2*xy,xx-yy),0,Math.PI*2);a.fill();
  };
  for (let first=0; first<12; first+=3) {
    const page=createCanvas(1536,512), a=page.getContext("2d"), guide=createCanvas(1536,512), g=guide.getContext("2d");
    a.fillStyle="#00ff00";a.fillRect(0,0,1536,512);g.fillStyle="white";g.fillRect(0,0,1536,512);
    const rows=[];
    for (let column=0; column<3; column++) {
      const frame=source.directions[direction].frames[first+column];
      a.save();a.translate(column*512,0);a.scale(4,4);a.translate(-32,-56);
      a.fillStyle="#756a5b";a.strokeStyle="#756a5b";a.lineCap="round";a.lineJoin="round";
      const leg=id=>{const foot=frame.feet[id];a.save();a.beginPath();a.rect(32,56,128,foot.points[3][1]-56);a.clip();for(let j=1;j<4;j++){a.beginPath();a.moveTo(...foot.points[j-1]);a.lineTo(...(j===3?[foot.points[3][0],foot.points[3][1]-2]:foot.points[j]));a.lineWidth=j===1?6:j===2?4.5:3;a.stroke();}const p=foot.points[3];a.beginPath();a.ellipse(p[0],p[1]-2,3.5,2,0,0,Math.PI*2);a.fill();a.restore();};
      Object.keys(frame.feet).forEach(leg);
      const [tip,base]=frame.guideLines[0];a.beginPath();a.moveTo(base[0]-dy*4,base[1]+dx*3);a.lineTo(tip[0],tip[1]+2);a.lineTo(base[0]+dy*4,base[1]-dx*3);a.closePath();a.fill();
      ellipse(a,0,22,24,16,8);
      if(direction==="E") {
        ellipse(a,0,22,24,16,8);
        a.drawImage(registered,32*6,56*6,768,504,32,56,128,84);
      } else {
        ellipse(a,26,48,22,22,26);
        for(const lateral of [-14,14]) {const p=project(20,lateral,74), tip=project(17,lateral,90);a.beginPath();a.moveTo(p[0]-5,p[1]+7);a.lineTo(...tip);a.lineTo(p[0]+5,p[1]+7);a.closePath();a.fill();}
        if(!["N","NE"].includes(direction)) ellipse(a,44,42,8,10,7);
        near[direction].forEach(leg);
      }
      a.restore();
      a.strokeStyle="black";a.lineWidth=4;a.strokeRect(column*512+2,2,508,508);
      a.strokeStyle="#00ffff";a.lineWidth=2;
      for(const id of near[direction]) {const q=frame.feet[id].points[3],x=column*512+(q[0]-32)*4,y=(q[1]-56)*4;a.beginPath();a.moveTo(x-5,y);a.lineTo(x+5,y);a.moveTo(x,y-5);a.lineTo(x,y+5);a.stroke();}
      g.save();g.translate(column*512,0);g.scale(4,4);g.translate(-32,-56);g.strokeStyle="black";g.lineWidth=1.4;g.lineJoin="round";g.lineCap="round";for(const points of frame.guideLines){g.beginPath();g.moveTo(...points[0]);for(const point of points.slice(1))g.lineTo(...point);g.stroke();}g.restore();
      rows.push(`COLUMN ${column+1}: approved ${direction} walking pose ${first+column+1}/12. Spine/hip ${frame.guideLines[1][0].map((v,i)=>(v-[32,56][i]).toFixed(2))}; shoulder ${frame.guideLines[1][1].map((v,i)=>(v-[32,56][i]).toFixed(2))}.\n`+Object.entries(frame.feet).map(([id,f])=>`${id} ${f.planted?"PLANTED":"SWING"}: `+f.points.map(p=>`(${(p[0]-32).toFixed(2)},${(p[1]-56).toFixed(2)})`).join(" → ")).join("\n"));
    }
    const id=`${direction}-${String(first+1).padStart(2,"0")}-${String(first+3).padStart(2,"0")}`, control=new URL(`controls/${id}.png`,root), bare=new URL(`guides/${id}.png`,root);
    const bytes=page.toBuffer("image/png");await writeFile(control,bytes);await writeFile(bare,guide.toBuffer("image/png"));
    const prompt=`Use case: precise-object-edit. Draw exactly THREE complete whole-body wolf game sprites in the supplied wide registered template, one per bordered cell, ordered left to right. Image 1 is the ORIGINAL approved appearance basis: preserve its huge broad head, tiny squat torso, very short thick canine legs, small weary eyes, ears, grey-brown coat markings and gritty matte dry-painted flat 2D game medium. Image 2 is a fresh pose-shaped authoring template with the exact silhouettes/contact markers. Image 3 is the literal approved skeletal pose sequence. Geometry comes from images 2 and 3; image 1 supplies appearance only. Do not substitute the standing pose of image 1. No prior failed painting is an input.\nAll three face ${views[direction]} from the same 45-degree elevated orthographic camera. The animal remains a quadruped with a horizontal canine torso viewed from above, never an upright/biped creature. Fill the posed regions with one organically connected furry wolf per cell, with correct canine stifle/hock and elbow/carpus anatomy. Keep the head/spine/camera/scale and coat features identical across all three; only the specified limbs change. No 3D rendering, realistic tall anatomy, enlarged eyes, exposed paw pads, extra limbs, background props or cast shadow.\nEach cell is exactly 128×128 logical units, independent local coordinates. Keep every cyan cross at the paw UNDERSIDE EDGE MIDPOINT while painting, then erase the crosses. Respect planted versus swinging identities and all joint rows below; limbs may naturally occlude but must not relocate. Retain all THREE black cell borders, the full wide canvas, original cell margins and solid pure #00ff00 background; do not zoom, crop, recenter or rearrange. No labels or extra figures.\n${rows.join("\n\n")}`;
    const args={prompt,referenced_image_paths:[source.identity.crop,fileURLToPath(control),fileURLToPath(bare)],transparent_background:false};
    await writeFile(new URL(`requests/${id}.json`,root),JSON.stringify(args,null,2)+"\n");pages.push({id,direction,poses:[first+1,first+2,first+3],control:fileURLToPath(control),controlSha256:createHash("sha256").update(bytes).digest("hex"),guide:fileURLToPath(bare),request:`requests/${id}.json`,status:"pending"});
  }
}
await writeFile(new URL("manifest.json",root),JSON.stringify({decision:{commit:"07962d5",confidence:.99,instruction:"2026-10-06 user explicitly says to continue the existing approach and fill every approved stick frame first; no AniDoc upload."},originalReference:source.identity.crop,originalSha256:source.identity.cropSha256,sourcePlan:"../walk-v07/manifest.json",pages,sourceDrawingsRequired:60,exportFramesRequired:96,mirrors:{W:{source:"E",phaseOffset:6},NW:{source:"NE",phaseOffset:6},SW:{source:"SE",phaseOffset:6}},fps:12,cycleMs:1000,pivot:[96,156],crop:[32,56,128,128],state:"Full drawing coverage in progress; numerical and visual QA remain distinct from coverage."},null,2)+"\n");
console.log("Prepared 20 three-pose drawing requests for all 60 source poses, plus verified whole-frame mappings for 36 opposite-facing poses.");

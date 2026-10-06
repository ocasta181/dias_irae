import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { createHash } from "node:crypto";

const require=createRequire(import.meta.url);
const sharp=require(require.resolve("sharp",{paths:[dirname(require.resolve(process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas"))]}));
const root=new URL("walk-v10/",import.meta.url), manifest=JSON.parse(await readFile(new URL("manifest.json",root)));
const plan=JSON.parse(await readFile(new URL("walk-v07/manifest.json",import.meta.url)));
const prior=JSON.parse(await readFile(new URL("atlas.json",import.meta.url)));
const maps=Object.fromEntries(["N","NE","E","SE","S","SW","W","NW"].map(direction=>[direction,new Map()]));
for(const page of manifest.pages)for(const frame of page.frames??[])maps[page.direction].set(frame.pose,{...frame,page:page.id,reflected:false});
for(const [direction, mapping]of Object.entries(manifest.mirrors))for(let pose=1;pose<=12;pose++){
  const sourcePose=(pose-1+mapping.phaseOffset)%12+1, source=maps[mapping.source].get(sourcePose);
  if(!source)continue;
  const bytes=await sharp(await readFile(new URL(source.image,root))).flop().png().toBuffer();
  const image=`frames/${direction}-${String(pose).padStart(2,"0")}.png`;await writeFile(new URL(image,root),bytes);
  maps[direction].set(pose,{id:direction+"-"+String(pose).padStart(2,"0"),pose,image,sha256:createHash("sha256").update(bytes).digest("hex"),page:source.page,reflected:true,sourceFacing:mapping.source,sourcePose,quality:source.quality});
}
const directions={};
for(const [direction, map]of Object.entries(maps)){
  if(map.size!==12)continue;
  const frames=[], packed=Buffer.alloc(784*588*4);
  for(let pose=1;pose<=12;pose++){
    const source=map.get(pose), input=await readFile(new URL(source.image,root));
    const x=(pose-1)%4*196+2,y=Math.floor((pose-1)/4)*196+2;
    const pixels=await sharp(input).ensureAlpha().raw().toBuffer();
    for(let row=0;row<192;row++)pixels.copy(packed,((y+row)*784+x)*4,row*192*4,(row+1)*192*4);
    const target=plan.directions[direction].frames[pose-1];
    frames.push({family:"walk",pose,rect:[x,y,192,192],pivot:[96,156],logicalSize:[192,192],trimOffset:[0,0],image:`walk-v10/sheets/wolf-${direction.toLowerCase()}-walk.png`,sourceStandingHeight:64,sourceFile:"walk-v10/"+source.image,sha256:source.sha256,reflected:source.reflected,poseGuide:{lines:target.guideLines,feet:target.feet,basis:"approved target geometry, not measured painted landmarks"}});
  }
  const image=`sheets/wolf-${direction.toLowerCase()}-walk.png`, bytes=await sharp(packed,{raw:{width:784,height:588,channels:4}}).png().toBuffer();await writeFile(new URL(image,root),bytes);
  directions[direction]={image:"walk-v10/"+image,dimensions:[784,588],sha256:createHash("sha256").update(bytes).digest("hex"),frames,assessment:"Twelve whole-body drawing candidates follow the approved phase order. Actual paw contacts, source-view registration, camera and loop transitions remain under visual/geometric review. The pose overlay is the approved control, not a measurement pass."};
}
const progress={sourceDrawings:manifest.pages.reduce((sum,page)=>sum+(page.frames?.length??0),0),paintedFrames:Object.values(maps).reduce((sum,map)=>sum+map.size,0),completedCandidateSheets:Object.keys(directions).length,productionApproved:false,rows:Object.entries(maps).map(([direction,map])=>({direction,painted:map.size,poses:Array.from(map.values()).sort((a,b)=>a.pose-b.pose),complete:map.size===12}))};
await writeFile(new URL("progress.json",root),JSON.stringify(progress,null,2)+"\n");
if(Object.keys(directions).length){
  const count=Object.keys(directions).length, status=count===8?"All 96 frame slots are filled from the original wolf and approved pose controls.":`${count}/8 facings are packed (${Object.keys(directions).join(", ")}); remaining drawings are in progress.`;
  const atlas={selection:prior.selection,sourceFrames:count*12,reviewStatus:`Painted wolf study: twelve distinct whole-body drawings per available direction, twelve poses per second. ${status} Actual pose/contact/camera fidelity and continuous gait quality remain under review; use Frame by frame and the approved-pose overlay to inspect alignment.`,directions,clips:{idle:{label:"Hold pose 1",fps:1,loop:true,frames:[{source:0,durationMs:1000}]},walk:{label:"Twelve-pose walk study",fps:12,loop:true,frames:Array.from({length:12},(_,source)=>({source,durationMs:1000/12}))}},references:prior.references,motion:{referenceHeight:64,walkSpeed:36,stride:36,walkDuration:1000},packing:"Whole-body bitmap frames only. Uniform page/cell scaling into the same 192-square canvas, pivot (96,156); no silhouette fitting, runtime body-part assembly, bob, sway or rotation. Opposite facings reflect the whole frame with a six-pose phase shift. Two-pixel clear gutters. Drawing coverage does not imply art production approval."};
  await writeFile(new URL("atlas.json",root),JSON.stringify(atlas,null,2)+"\n");
}
console.log(JSON.stringify({sourceDrawings:progress.sourceDrawings,paintedFrames:progress.paintedFrames,candidateSheets:progress.completedCandidateSheets,atlasReady:Object.keys(directions).length===8}));

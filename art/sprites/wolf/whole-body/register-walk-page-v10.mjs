import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { createHash } from "node:crypto";

const require=createRequire(import.meta.url);
const sharp=require(require.resolve("sharp",{paths:[dirname(require.resolve(process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas"))]}));
const root=new URL("walk-v10/",import.meta.url), [id, originalPath, variant="", requestOverride]=process.argv.slice(2);
const manifest=JSON.parse(await readFile(new URL("manifest.json",root))), page=manifest.pages.find(page=>page.id===id);
if(!page || !originalPath) throw new Error("Expected page ID and returned original image path.");
const bytes=await readFile(originalPath), {data,info}=await sharp(bytes).ensureAlpha().raw().toBuffer({resolveWithObject:true});
if(info.width!==info.height*3) throw new Error("The generated page does not preserve three square cells: "+info.width+"x"+info.height);
await writeFile(new URL("raw/"+id+variant+".png",root),bytes);
const request=JSON.parse(await readFile(new URL(requestOverride ?? page.request,root))), frames=[];
const greenKey=(r,g,b)=>g>Math.max(r,b)+12 && g>r*1.25 && g>b*1.25;
const noseObservations=[];
if(page.direction==="E")for(let column=0;column<3;column++){
  let right=-1, ys=[];
  for(let y=0;y<info.height;y++)for(let x=0;x<info.height;x++){
    const lx=32+x*128/info.height,ly=56+y*128/info.height;
    if(lx<115 || lx>155 || ly<105 || ly>140)continue;
    const k=(y*info.width+column*info.height+x)*4,r=data[k],g=data[k+1],b=data[k+2];
    if(greenKey(r,g,b))continue;
    if(x>right){right=x;ys=[];}if(x===right)ys.push(y);
  }
  if(right<0)throw new Error("Profile nose registration landmark missing.");
  noseObservations.push([32+right*128/info.height,56+(Math.min(...ys)+Math.max(...ys))/2*128/info.height]);
}
const shift=[0,0];
for(let column=0; column<3; column++) {
  const side=info.height, rgba=Buffer.alloc(side*side*4), border=Math.ceil(side*2/128);
  let occupied=0, residualMarks=0;
  for(let y=0;y<side;y++)for(let x=0;x<side;x++) {
    const k=(y*info.width+column*side+x)*4, out=(y*side+x)*4;
    const r=data[k],g=data[k+1],b=data[k+2], matte=greenKey(r,g,b);
    const marker=b>120&&g>120&&r<100;
    const inside=x>=border&&x<side-border&&y>=border&&y<side-border;
    rgba[out]=r;rgba[out+1]=g;rgba[out+2]=b;rgba[out+3]=inside&&!matte&&!marker?data[k+3]:0;
    if(inside && marker)residualMarks++;
    if(rgba[out+3]>=128)occupied++;
  }
  if(occupied<side*side*.01)throw new Error("No whole-body drawing in column "+column);
  const sprite=await sharp(rgba,{raw:{width:side,height:side,channels:4}}).resize(128,128,{kernel:"lanczos3"}).png().toBuffer();
  const canvas=await sharp({create:{width:192,height:192,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:sprite,left:32+shift[0],top:56+shift[1]}]).png().toBuffer();
  const name=page.direction+"-"+String(page.poses[column]).padStart(2,"0");
  await writeFile(new URL("frames/"+name+".png",root),canvas);
  frames.push({id:name,pose:page.poses[column],image:"frames/"+name+".png",sha256:createHash("sha256").update(canvas).digest("hex"),rawCell:[column*side,0,side,side],registration:{scale:128/side,offset:[32+shift[0],56+shift[1]],pageShift:shift},residualMarkerPixels:residualMarks,quality:"candidate; actual pose/contact measurements pending"});
}
const record={tool:"built-in image_gen",actual_input:request,originalPath,rawSha256:createHash("sha256").update(bytes).digest("hex"),dimensions:[info.width,info.height],frames,failedArtInputs:false,noseObservations,pageShift:shift,registration:"Fixed whole-cell scale 128/sourceSide and crop offset (32,56). Nose observations are diagnostic only; no drawing-derived translation, fitting, silhouette scaling or runtime parts."};
await writeFile(new URL("raw/"+id+variant+"-record.json",root),JSON.stringify(record,null,2)+"\n");
page.status="drawn candidate";page.record="raw/"+id+variant+"-record.json";page.frames=frames;
await writeFile(new URL("manifest.json",root),JSON.stringify(manifest,null,2)+"\n");
console.log(JSON.stringify({id,drawn:3,dimensions:record.dimensions,sourceFramesDrawn:manifest.pages.reduce((count,page)=>count+(page.frames?.length??0),0)}));

import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, writeFile, copyFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { createRequire } from "node:module";
import { promisify } from "node:util";
import { execFile } from "node:child_process";

const require=createRequire(import.meta.url);
const sharp=require(require.resolve("sharp",{paths:[dirname(require.resolve(process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas"))]}));
const run=promisify(execFile);

test("a changed nose location cannot shift grounded paws or introduce page-boundary travel", async()=>{
  const dir=await mkdtemp(join(tmpdir(),"dias-wolf-registration-"));
  try {
    await mkdir(join(dir,"walk-v10","raw"),{recursive:true});
    await mkdir(join(dir,"walk-v10","frames"));
    await copyFile(new URL("register-walk-page-v10.mjs",import.meta.url),join(dir,"register-walk-page-v10.mjs"));
    const pages=[{id:"E-01-03",direction:"E",poses:[1,2,3],request:"request.json"},{id:"E-04-06",direction:"E",poses:[4,5,6],request:"request.json"}];
    await writeFile(join(dir,"walk-v10","manifest.json"),JSON.stringify({pages}));
    await writeFile(join(dir,"walk-v10","request.json"),JSON.stringify({prompt:"Synthetic coordinate regression fixture; no generation."}));
    for(const [index,page] of pages.entries()) {
      const side=128, data=Buffer.alloc(side*side*3*4);
      for(let y=0;y<side;y++)for(let x=0;x<side*3;x++) {
        const local=x%side, k=(y*side*3+x)*4;
        const body=local>=30&&local<95&&y>=60&&y<85;
        const paw=local>=40&&local<=45&&y>=95&&y<=98;
        const nose=local>=105&&local<120-index*4&&y>=62+index*3&&y<=68+index*3;
        const brown=body||paw||nose;
        data[k]=brown?90:0;data[k+1]=brown?65:255;data[k+2]=brown?45:0;data[k+3]=255;
      }
      const raw=join(dir,page.id+".png");
      await sharp(data,{raw:{width:side*3,height:side,channels:4}}).png().toFile(raw);
      await run(process.execPath,[join(dir,"register-walk-page-v10.mjs"),page.id,raw]);
      const record=JSON.parse(await readFile(join(dir,"walk-v10","raw",page.id+"-record.json")));
      assert.deepEqual(record.pageShift,[0,0],"nose observations must remain diagnostic");
      for(const pose of page.poses) {
        const frame=await sharp(await readFile(join(dir,"walk-v10","frames",`E-${String(pose).padStart(2,"0")}.png`))).ensureAlpha().raw().toBuffer();
        const at=(x,y)=>Array.from(frame.subarray((y*192+x)*4,(y*192+x)*4+4));
        assert.deepEqual(at(74,154),[90,65,45,255],"the paw remains at raw (42,98) plus fixed (32,56)");
        assert.equal(at(74,155)[3],0,"export must not move the sole downward");
        assert.deepEqual(record.frames.find(f=>f.pose===pose).registration.offset,[32,56]);
      }
    }
  } finally {
    await rm(dir,{recursive:true,force:true});
  }
});

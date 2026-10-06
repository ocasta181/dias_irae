import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname } from "node:path";
import { createHash } from "node:crypto";

const require=createRequire(import.meta.url);
const sharp=require(require.resolve("sharp",{paths:[dirname(require.resolve(process.env.DIAS_IRAE_CANVAS_MODULE || "@napi-rs/canvas"))]}));
const root=new URL("walk-v10/",import.meta.url), progress=JSON.parse(readFileSync(new URL("progress.json",root)));
test("the filled candidate package contains all ninety-six distinct painted frames and exact controls", async()=>{
  const atlas=JSON.parse(readFileSync(new URL("atlas.json",root)));
  const plan=JSON.parse(readFileSync(new URL("walk-v07/manifest.json",import.meta.url)));
  assert.equal(progress.paintedFrames,96);assert.equal(progress.completedCandidateSheets,8);
  assert.equal(atlas.sourceFrames,96);assert.equal(Object.keys(atlas.directions).length,8);
  assert.equal(atlas.clips.walk.fps,12);assert.equal(atlas.clips.walk.frames.length,12);
  assert.ok(Math.abs(atlas.clips.walk.frames.reduce((sum,frame)=>sum+frame.durationMs,0)-1000)<1e-7);
  const hashes=new Set();
  for(const [direction,page]of Object.entries(atlas.directions))for(const [index,frame]of page.frames.entries()){
    assert.equal(frame.pose,index+1);assert.equal(atlas.clips.walk.frames[index].source,index);
    assert.deepEqual(frame.pivot,[96,156]);assert.deepEqual(frame.poseGuide.lines,plan.directions[direction].frames[index].guideLines);
    const source=await sharp(readFileSync(new URL(frame.sourceFile,import.meta.url))).ensureAlpha().raw().toBuffer();
    hashes.add(createHash("sha256").update(source).digest("hex"));
  }
  assert.equal(hashes.size,96);
});
test("every completed sheet reconstructs all twelve whole-body source canvases exactly", async()=>{
  for(const row of progress.rows.filter(row=>row.complete)){
    assert.equal(row.poses.length,12);
    const file=new URL(`sheets/wolf-${row.direction.toLowerCase()}-walk.png`,root);
    assert.deepEqual(await sharp(readFileSync(file)).metadata().then(m=>[m.width,m.height]),[784,588]);
    const hashes=new Set();
    for(const frame of row.poses){
      const x=(frame.pose-1)%4*196+2,y=Math.floor((frame.pose-1)/4)*196+2;
      const actual=await sharp(readFileSync(file)).extract({left:x,top:y,width:192,height:192}).ensureAlpha().raw().toBuffer();
      const source=await sharp(readFileSync(new URL(frame.image,root))).ensureAlpha().raw().toBuffer();
      assert.deepEqual(actual,source);hashes.add(createHash("sha256").update(source).digest("hex"));
      for(const pixel of [0,191,191*192,192*192-1])assert.equal(source[pixel*4+3],0);
    }
    assert.equal(hashes.size,12,"each direction needs twelve distinct source drawings");
  }
});
test("opposite views use the entire matching half-cycle source frame, without moving a pivot", async()=>{
  for(const row of progress.rows.filter(row=>["W","NW","SW"].includes(row.direction))){
    for(const frame of row.poses){
      assert.equal(frame.sourcePose,(frame.pose-1+6)%12+1);
      const source=new URL(`frames/${frame.sourceFacing}-${String(frame.sourcePose).padStart(2,"0")}.png`,root);
      const expected=await sharp(readFileSync(source)).flop().ensureAlpha().raw().toBuffer();
      const actual=await sharp(readFileSync(new URL(frame.image,root))).ensureAlpha().raw().toBuffer();
      assert.deepEqual(actual,expected);
    }
  }
});

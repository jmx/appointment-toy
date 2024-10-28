import { useState } from 'react'
import './App.css'
import * as twgl from 'twgl.js'


function App() {

  function go() {
    const canvas = document.getElementById('c') as HTMLCanvasElement;
    const programInfo = twgl.createProgramInfo(canvas.getContext('webgl') as WebGLRenderingContext, ['vs', 'fs']);
    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    }
    const bufferInfo = twgl.createBufferInfoFromArrays(canvas.getContext('webgl') as WebGLRenderingContext, arrays);
    function render(time: number) {
      
      twgl.resizeCanvasToDisplaySize(canvas);
      const gl = canvas.getContext('webgl') as WebGLRenderingContext;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      const uniforms = {
        time: time * 0.001,
        resolution: [gl.canvas.width, gl.canvas.height],
      }
      gl.useProgram(programInfo.program);
      twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
      twgl.setUniforms(programInfo, uniforms);
      twgl.drawBufferInfo(gl, bufferInfo);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  setTimeout(go, 1000);

  return (
    <>
      <canvas id='c' />
    </>
  )
}

export default App

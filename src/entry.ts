import "../public/styles/main.scss";
// import mapboxgl from "mapbox-gl";

// const map = new mapboxgl.Map({
//   container: document.querySelector<HTMLElement>("#map")!,
//   accessToken:
//     "pk.eyJ1IjoiZGFzb25jaGVuZyIsImEiOiJja2c5OTlkb3UwaWs2MndteXVzcm8xM3MxIn0.1k5bSWdzvMz-7D-DQeUohA",
//   style: "mapbox://styles/mapbox/streets-v11",
//   center: [120.3049, 31.4751],
//   zoom: 12,
// });

// 创建WebGL上下文
const canvas = document.querySelector("canvas")!;
const gl = canvas.getContext("webgl2")!;

// 创建WebGL程序
const vertex = `
  attribute vec2 position;
  varying vec3 color;

  void main() {
    gl_PointSize = 1.0;
    color=vec3(0.5+position*0.5,0.0);
    gl_Position = vec4(position*0.5, 1.0, 1.0);
  }
`;

const fragment = `
  precision mediump float;
  varying vec3 color;

  void main()
  {
    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);

const program = gl.createProgram()!;
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// 将数据写入缓冲区
const points = new Float32Array([-1, -1, 0, 1, 1, -1]);
const bufferId = gl.createBuffer()!;
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

// 将缓冲区数据读取到GPU
const vPosition = gl.getAttribLocation(program, "position");
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);

// 执行着色器程序完成绘制
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);

console.log("Graphics");

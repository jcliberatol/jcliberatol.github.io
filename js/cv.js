/*


var gl = {};
var program = {};
var t = 0.0;





<canvas id="view" width="400" height="400"></canvas>


<script id="shader-fs" type="x-shader/x-fragment">
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323
uniform float u_time;


void main(void) {
vec2 pos = gl_FragCoord.xy / 200.0 - 1.0;
//pos.x pos.y
float dist = length(pos);
float cr = 0.0;
float cg = 0.0;
float cb = 0.0;
float ca = 0.0;

cg = smoothstep(0.5,0.4, dist);
cg += 0.1 * smoothstep(0.6,0.4,pos.y);
ca = 0.5;
gl_FragColor = vec4(cr, cg, cb, ca);
}
</script>


<script id="shader-vs" type="x-shader/x-vertex">
#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aVertexPosition;

void main(void) {
gl_Position = vec4(aVertexPosition, 1.0);
}
</script>



function start() {
  var view = document.getElementById('view');
  gl = view.getContext('webgl');

  gl.viewport(0, 0, 400, 400);
  var aspectRatio = 1;

  function getShader(id, type) {
    var source = document.getElementById(id).textContent;
    var shader = gl.createShader(type);


    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
  }

  var fragmentShader = getShader("shader-fs", gl.FRAGMENT_SHADER);
  var vertexShader = getShader("shader-vs", gl.VERTEX_SHADER);

  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log("Unable to initialize the shader program.");
  }



  gl.useProgram(program);

  animate();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  var vPos = gl.getAttribLocation(program, "aVertexPosition");
  gl.enableVertexAttribArray(vPos);

  //Pass the time variable
  var time = gl.getUniformLocation(program, "u_time");
  gl.uniform1f(time, t);
  t+= 0.01;

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

  var vertices = new Float32Array([
    1.0,  1.0,  0.0,
    -1.0, 1.0,  0.0,
    1.0,  -1.0, 0.0,
    -1.0, -1.0, 0.0
  ]);

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.vertexAttribPointer(vPos, 3, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.deleteBuffer(vBuffer)
}

function animate() {
  render();
  requestAnimationFrame(animate);
}

start();
*/

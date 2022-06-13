varying vec2 vUvs;
varying vec3 vColor;

uniform vec4 color1;
uniform vec4 color2;

void main() {
  // gl_FragColor = vec4(vUvs.y, 0, vUvs.x, 1.0);
  // gl_FragColor = vec4(1.0 - vUvs.x, 1.0 - vUvs.x, 1.0 - vUvs.x, 1.0);
  // gl_FragColor = vec4(vUvs.x, vUvs.x, vUvs.x, 1.0);
  // gl_FragColor = mix(color1, color2, vUvs.x);
  gl_FragColor = vec4(vColor, 1.0);

}
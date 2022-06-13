varying vec2 vUvs;

uniform sampler2D diffuse;
uniform sampler2D overlay;
uniform vec4 tint;

void main() {
  // vec2 uvs = vec2(vUvs.x * 3.0, vUvs.y * 2.0);
  // vec2 uvs = vUvs / 10.0;
  vec4 diffuseSample = texture2D(diffuse, vUvs);
  // vec4 overlaySample = texture2D(overlay, vUvs);
  gl_FragColor = diffuseSample * tint;
  // gl_FragColor = diffuseSample * overlaySample;
  // gl_FragColor = vec4(vec3(overlaySample.w), 1.0);
  // gl_FragColor = mix(diffuseSample, overlaySample, overlaySample.w);
  // gl_FragColor = vec4(diffuseSample.r, 0.0, 0.0, 1.0);

}
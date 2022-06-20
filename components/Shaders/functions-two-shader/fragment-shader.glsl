varying vec2 vUvs;

float sudoClamp(float value, float minValue, float maxValue) {
  return max(min(value, maxValue), minValue);
}

void main() {
  vec3 color = vec3(0.0);
  vec3 black = vec3(0.0, 0.0, 0.0);
  vec3 white = vec3(1.0, 1.0, 1.0);
  vec3 red = vec3(1.0, 0.0, 0.0);
  vec3 green = vec3(0.0, 1.0, 0.0);
  vec3 blue = vec3(0.0, 0.0, 1.0);

  float linearValue = vUvs.x;
  // float smoothValue = smoothstep(0.0, 1.0, vUvs.x);
  float smoothValue = sudoClamp(vUvs.x, 0.25, 0.75);
  float stepValue = step(0.5, vUvs.x);
  // color = vec3(vUvs.x);
  // color = vec3(step(0.5, vUvs.x));
  // color = mix(red, green, vUvs.x);
  // color = vec3(smoothstep(0.0, 1.0, vUvs.x));
  // color = mix(red, green, smoothstep(0.0, 1.0, vUvs.x));

  float line1 = smoothstep(0.0, 0.005, abs(vUvs.y - 0.33));
  float line2 = smoothstep(0.0, 0.005, abs(vUvs.y - 0.66));

  float linearLine = smoothstep(0.0, 0.0075, abs(vUvs.y - mix(0.33, 0.66, linearValue)));
  float smoothLine = smoothstep(0.0, 0.0075, abs(vUvs.y - mix(0.0, 0.33, smoothValue)));
  float stepLine = smoothstep(0.0, 0.0075, abs(vUvs.y - mix(0.66, 1.0, stepValue)));

  if(vUvs.y < 0.33) {
    color = mix(red, blue, smoothValue);
  } else if(vUvs.y < 0.66) {
    color = mix(red, blue, vUvs.x);
  } else {
    color = mix(red, blue, stepValue);
  }

  color = mix(black, color, line1);
  color = mix(black, color, line2);
  color = mix(white, color, smoothLine);
  color = mix(white, color, linearLine);
  color = mix(white, color, stepLine);

  // color = vec3(linearLine);

  gl_FragColor = vec4(color, 1.0);
}
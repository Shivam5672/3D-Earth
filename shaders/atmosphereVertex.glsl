varying vec3 vectorNormal;
void main(){
    vectorNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
}
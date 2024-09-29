varying vec2 vertexUV;
varying vec3 vectorNormal;
void main(){
    vertexUV = uv;
    vectorNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
}
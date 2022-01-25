uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform float uProgress;

varying vec2 vUv;

void main()
    {

        vec4 textureColor = texture2D(uTexture, vUv);
        vec4 textureColor2 = texture2D(uTexture2, vUv);

        vec4 transition = mix(textureColor, textureColor2, uProgress);

        gl_FragColor = transition;

        if(gl_FragColor.r < 0.1 && gl_FragColor.g < 0.1 && gl_FragColor.b < 0.1) discard;
           
    }
uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform float uProgress;
uniform float uHide;

varying vec2 vUv;

void main()
    {
        if(uHide == 0.0) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
        else {
             vec4 textureColor = texture2D(uTexture, vUv);
            vec4 textureColor2 = texture2D(uTexture2, vUv);

            vec4 transition = mix(textureColor, textureColor2, uProgress);

            gl_FragColor = transition;

        }
        if(gl_FragColor.r < 0.1 && gl_FragColor.g < 0.1 && gl_FragColor.b < 0.1) discard;
           
    }
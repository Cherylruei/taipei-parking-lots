import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: "Noto Sans TC";
  src:url(/public/fonts/NotoSansHK-Light.woff2) format("woff2"), 
      url(/public/fonts/NotoSansHK-Light.woff) format("woff"),
      url(/public/fonts/NotoSansHK-Light.otf) format('opentype'); 
  font-weight: 300;
  font-style: light;
  unicode-range: U+4E00-9FFF, U+00-024F;
}

@font-face {
  font-family: "Noto Sans TC";
  src:url(/public/fonts/NotoSansHK-Medium.woff2) format("woff2"),
      url(/public/fonts/NotoSansHK-Medium.woff) format("woff"),
      url(/public/fonts/NotoSansHK-Medium.otf) format('opentype');
  font-weight: 400;
  font-style: normal;
  unicode-range: U+4E00-9FFF, U+00-024F;
}

@font-face {
  font-family: "Noto Sans TC";
  src:url(/public/fonts/NotoSansHK-Bold.woff2) format("woff2"),
      url(/public/fonts/NotoSansHK-Bold.woff) format("woff"),
      url(/public/fonts/NotoSansHK-Bold.otf) format('opentype');
  font-weight: 700;
  font-style: normal;
  unicode-range: U+4E00-9FFF, U+00-024F;
}



/* css reset */
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}


/* CSS common */
:root {
  /* font-size */
  --fs-basic: 1rem;
  --fs-h3: 1.5rem;
  --fs-h2: 1.75rem;
  --fs-h1: 2rem;
  /* colors */
  --color-theme: #0ed7da;
  --color-grey: #f0f0f0;
  --color-white-grey: #f9f9f9;
  --color-white: #ffffff;
}

html,body {
  min-height: 100%;
  scroll-behavior: smooth;
  font-family: "Noto Sans TC";
  font-weight: 400;
  font-style: normal;
}

`;

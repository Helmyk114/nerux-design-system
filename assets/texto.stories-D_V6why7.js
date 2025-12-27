import{j as d}from"./iframe-CM_nSCyq.js";import{c as e}from"./clsx-B-dksMZM.js";import"./preload-helper-PPVm8Dsz.js";function s({variant:o="body",as:i="p",children:l,className:c}){const p={title:e("font-[var(--font-family-base)]","text-[var(--font-size-title)]","font-[var(--font-weight-semibold)]"),subtitle:e("font-[var(--font-family-base)]","text-[var(--font-size-subtitle)]","font-[var(--font-weight-medium)]"),body:e("font-[var(--font-family-base)]","text-[var(--font-size-body)]","font-[var(--font-weight-regular)]"),caption:e("font-[var(--font-family-base)]","text-[var(--font-size-caption)]","font-[var(--font-weight-regular)]")};return d.jsx(i,{className:e(p[o],c),children:l})}s.__docgenInfo={description:"",methods:[],displayName:"Text",props:{variant:{required:!1,tsType:{name:"union",raw:'"title" | "subtitle" | "body" | "caption"',elements:[{name:"literal",value:'"title"'},{name:"literal",value:'"subtitle"'},{name:"literal",value:'"body"'},{name:"literal",value:'"caption"'}]},description:"Tipo de texto semántico",defaultValue:{value:'"body"',computed:!1}},as:{required:!1,tsType:{name:"React.JSX.IntrinsicElements"},description:"Elemento HTML a renderizar",defaultValue:{value:'"p"',computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Contenido"},className:{required:!1,tsType:{name:"string"},description:"Clases extra si se necesitan"}}};const v={title:"Design System/Text",component:s,argTypes:{variant:{control:"select",options:["title","subtitle","body","caption"]},as:{control:"select",options:["h1","h2","p","span"]}}},t={args:{variant:"title",as:"h1",children:"Título principal",className:""}},a={args:{variant:"subtitle",as:"h2",children:"Subtítulo"}},r={args:{variant:"body",as:"span",children:"Texto de cuerpo normal"}},n={args:{variant:"caption",as:"span",children:"Texto auxiliar"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "title",
    as: "h1",
    children: "Título principal",
    className: ""
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "subtitle",
    as: "h2",
    children: "Subtítulo"
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "body",
    as: "span",
    children: "Texto de cuerpo normal"
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "caption",
    as: "span",
    children: "Texto auxiliar"
  }
}`,...n.parameters?.docs?.source}}};const b=["Title","Subtitle","Body","Caption"];export{r as Body,n as Caption,a as Subtitle,t as Title,b as __namedExportsOrder,v as default};

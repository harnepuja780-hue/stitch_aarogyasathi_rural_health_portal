const fs = require('fs');
const path = require('path');

const convertHtmlToJsx = (htmlContent, componentName) => {
  // Extract body content
  let match = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = match ? match[1] : htmlContent;

  // Remove header and footer
  bodyContent = bodyContent.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '<Navbar />');
  bodyContent = bodyContent.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '<Footer />');
  
  // Remove script tags
  bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Convert attributes to camelCase
  bodyContent = bodyContent.replace(/class=/g, 'className=');
  bodyContent = bodyContent.replace(/for=/g, 'htmlFor=');
  bodyContent = bodyContent.replace(/tabindex=/g, 'tabIndex=');
  bodyContent = bodyContent.replace(/xmlns:xlink=/g, 'xmlnsXlink=');
  bodyContent = bodyContent.replace(/stroke-width=/g, 'strokeWidth=');
  bodyContent = bodyContent.replace(/stroke-linecap=/g, 'strokeLinecap=');
  bodyContent = bodyContent.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  
  // Self close inputs and imgs
  bodyContent = bodyContent.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
  bodyContent = bodyContent.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
  bodyContent = bodyContent.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');
  bodyContent = bodyContent.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');

  // Convert HTML comments to JSX comments
  bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  // style tags string to object is hard with regex, replace them
  bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, styleString) => {
      // simple converter for style="width: 100%; height: 50px;"
      const styleProps = styleString.split(';').filter(s => s.trim() !== '').map(s => {
          const [key, value] = s.split(':');
          if (!key || !value) return '';
          const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
          return `"${camelKey}": "${value.trim().replace(/'/g, "\\'")}"`;
      }).filter(Boolean).join(', ');
      return `style={{ ${styleProps} }}`;
  });
  
  return `import React from 'react';\nimport Navbar from '../components/layout/Navbar';\nimport Footer from '../components/layout/Footer';\n\nconst ${componentName} = () => {\n  return (\n    <div className="bg-background min-h-screen text-on-surface flex flex-col">\n      ${bodyContent}\n    </div>\n  );\n};\n\nexport default ${componentName};\n`;
};

const componentsToMake = [
  { folder: 'health_quiz_accessibility', name: 'Quizzes' },
  { folder: 'nutrition_balanced_plate', name: 'Nutrition' },
  { folder: 'period_health_hygiene', name: 'PeriodHealth' },
  { folder: 'pregnancy_stages_care', name: 'Pregnancy' }
];

componentsToMake.forEach(({ folder, name }) => {
  const htmlPath = path.join(__dirname, folder, 'code.html');
  const jsxPath = path.join(__dirname, 'src', 'pages', `${name}.jsx`);
  if (fs.existsSync(htmlPath)) {
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const jsxContent = convertHtmlToJsx(htmlContent, name);
    fs.writeFileSync(jsxPath, jsxContent);
    console.log(`Converted ${name}`);
  } else {
    console.log(`Not found ${htmlPath}`);
  }
});

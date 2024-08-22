import marked from "marked";
import c from "ansi-colors";
import highlight from "cli-highlight";

// Custom renderer for marked
const consoleRenderer = new marked.Renderer();

// Override the code block renderer to use highlight-cli for syntax highlighting
consoleRenderer.code = function (code, language) {
  const highlightedCode = highlight(code);
  return `\n\`\`\`\n${highlightedCode}\n\`\`\`\n\n`;
};

/*
code(string code, string infostring, boolean escaped)
blockquote(string quote)
html(string html, boolean block)
heading(string text, number level, string raw)
hr()
list(string body, boolean ordered, number start)
listitem(string text, boolean task, boolean checked)
checkbox(boolean checked)
paragraph(string text)
table(string header, string body)
tablerow(string content)
tablecell(string content, object flags)
Inline-level renderer methods

strong(string text)
em(string text)
codespan(string code)
br()
del(string text)
link(string href, string title, string text)
image(string href, string title, string text)
text(string text)
*/

consoleRenderer.blockquote = function (quote) {
  return c.bold(quote);
};

consoleRenderer.heading = function (text, level) {
  if (level === 1) {
    return "\n" + c.bold.underline.yellow(text) + "\n\n";
  } else if (level === 2) {
    return "\n" + c.bold.cyan(text) + "\n\n";
  } else {
    return "\n" + c.bold(text) + "\n\n";
  }
};

consoleRenderer.hr = function () {
  return c.gray("—".repeat(80));
};

consoleRenderer.list = function (body, ordered, start) {
  let result = "";
  body.split("\n").forEach((line, i) => {
    if (line.trim() === "") return;
    let symbol = ordered ? c.bold(`${i}.`) : c.bold("•");
    result += symbol + " " + line + "\n";
  });

  return result;
};

consoleRenderer.listitem = function (text, task, checked) {
  let result = checked ? c.green("✔") : "";
  return result + " " + text + "\n";
};

consoleRenderer.checkbox = function (checked) {
  return checked ? c.green("✔") : c.red("✘");
};

consoleRenderer.paragraph = function (text) {
  return c.gray(text) + "\n";
};

consoleRenderer.table = function (header, body) {
  return header + body + "\n";
};

consoleRenderer.tablerow = function (content) {
  return content + "\n";
};

consoleRenderer.tablecell = function (content, flags) {
  return content + " ";
};

consoleRenderer.strong = function (text) {
  return c.bold(text);
};

consoleRenderer.em = function (text) {
  return c.italic(text);
};

consoleRenderer.codespan = function (code) {
  return "`" + highlight(code) + "`";
};

consoleRenderer.br = function () {
  return "\n";
};

consoleRenderer.del = function (text) {
  return c.strikethrough(text);
};

consoleRenderer.link = function (href, title, text) {
  return `${c.underline(text)} (${href})`;
};

consoleRenderer.image = function (href, title, text) {
  return c.underline(text);
};

consoleRenderer.text = function (text) {
  return text;
};

// Override the text renderer to colorize other text
/* consoleRenderer.text = function (text) {
  return colors.bold(text);
};
 */

export default consoleRenderer;

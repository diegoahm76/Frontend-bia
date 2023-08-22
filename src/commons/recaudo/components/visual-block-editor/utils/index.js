/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import * as Blockly from 'blockly/core';


export function modifyVariableInitValue(jsString, varName, newValue) {
  // Create a regular expression to match the variable initialization
  const regex = new RegExp('(var\\s+' + varName + '\\s*=\\s*)([^;]*)(;)');

  // Find the variable initialization in the string using the regular expression
  const match = jsString.match(regex);

  // If the variable initialization was found, replace the initialization value with the new value
  if (match) {
    const replacedString = match[1] + newValue + match[3];
    jsString = jsString.replace(match[0], replacedString);
  } else {
    // If the variable initialization was not found, add a new initialization statement to the string
    jsString = 'var ' + varName + ' = ' + newValue + ';\n' + jsString;
  }

  return jsString;
}

export class BlocklyUtils {

  static loadXml = (xmlText, workspace) => {
    if (xmlText) {
      // const xmlDom = Blockly.Xml.textToDom(xmlText);
      const xmlDom = Blockly.utils.xml.textToDom(xmlText);
      Blockly.Xml.domToWorkspace(xmlDom, workspace);
    }
  }

  static getXml = (workspace) => {
    const xmlDom = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xmlDom);
    return xmlText;
  }
}
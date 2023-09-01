/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blockly React Component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React, { useEffect, useRef } from 'react';
import Blockly from 'blockly/core';
import locale from 'blockly/msg/es';
import 'blockly/blocks';
import './BlocklyComponent.css';

Blockly.setLocale(locale);

const BlocklyComponent = (props) => {

  const blocklyDiv = useRef();
  const toolbox = useRef();
  const primaryWorkspace = props.primaryWorkspace;

  // add useEffect only when update array props.variables
  useEffect(() => {
    if (!primaryWorkspace.current) {

      const { initialXml, children, ...rest } = props;
      primaryWorkspace.current = Blockly.inject(
        blocklyDiv.current,
        {
          toolbox: toolbox.current,
          ...rest
        },
      );
      
      // Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), primaryWorkspace.current);
      Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(initialXml), primaryWorkspace.current);
    };
    window.r = primaryWorkspace.current
    props.variables?.forEach(variable => {
      primaryWorkspace.current.createVariable(variable);
    })

  }, [props, props.variables, primaryWorkspace, toolbox, blocklyDiv])

  return (
    <React.Fragment>
      <div ref={blocklyDiv} id="blocklyDiv" />
      <div style={{ display: 'none' }} ref={toolbox}>
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default BlocklyComponent;
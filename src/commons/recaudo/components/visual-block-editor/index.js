/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */

import BlocklyComponent, { Block, Category } from './Blockly';
import './blocks/customblocks';
import './generator/generator';


export const VisualBlockEditor = ({ workspace, readOnly, variables }) => {

  return (
    <BlocklyComponent
      readOnly={readOnly}
      sounds={true}
      trashcan={true}
      media={'https://blockly-demo.appspot.com/static/media/'}
      grid={{ spacing: 20, length: 3, colour: '#ccc', snap: true }}
      variables={variables}
      primaryWorkspace={workspace}
      move={{
        scrollbars: true,
        drag: true,
        wheel: true
      }}
      zoom={{
        controls: true,
      }}
      initialXml={`
        <xml xmlns="http://www.w3.org/1999/xhtml">
          <variables>
            <variable id="dgo%0q,A$LNqB;0N+3(V">numero1</variable>
            <variable id="oPO/j7uIo:!{2KVBxz^[">numero2</variable>
          </variables>
          <block type="math_arithmetic" id="[wuD+14!tj/+%ihTu6_|" x="263" y="163">
            <field name="OP">ADD</field>
            <value name="A">
              <shadow type="math_number" id="+|VYn3K5d[ZB*lCOhpb%">
                <field name="NUM">1</field>
              </shadow>
              <block type="variables_get" id="c9U%;1IxCwm(RCxfGT4T">
                <field name="VAR" id="dgo%0q,A$LNqB;0N+3(V">numero1</field>
              </block>
            </value>
            <value name="B">
              <shadow type="math_number" id="I6-LD)|S_^uG2A/V?IK1">
                <field name="NUM">1</field>
              </shadow>
              <block type="variables_get" id="[:A+Cg@E5p),yA9L%k[!">
                <field name="VAR" id="oPO/j7uIo:!{2KVBxz^[">numero2</field>
              </block>
            </value>
          </block>
        </xml>
      `}>
      <Category name="variables" categorystyle="variable_category">
        <Block type="variables_get" />
        <Block type="variables_set" />
      </Category>
      <Category name="control" categorystyle="logic_category">
        <Block type="controls_ifelse" />
        <Block type="logic_compare" />
        <Block type="logic_operation" />
        <Block type="logic_negate" />
        <Block type="logic_boolean" />
      </Category>
      <Category name="calculo" categorystyle="math_category">
        <Block type="math_arithmetic" />
        <Block type="math_single" />
        <Block type="math_number" />
      </Category>
    </BlocklyComponent>
  )
}
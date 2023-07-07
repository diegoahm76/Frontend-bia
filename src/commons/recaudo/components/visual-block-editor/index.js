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
        <xml xmlns="http://www.w3.org/1999/xhtml"></xml>
      `}
      collapse={false}
    >
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
      <Category name="calculo" categorystyle="math_category" expanded="true">
        <Block type="math_arithmetic" />
        <Block type="math_single" />
        <Block type="math_number" />
      </Category>
    </BlocklyComponent>
  )
}
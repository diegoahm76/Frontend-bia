/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
import { Button } from '@mui/material';
import { Tree, TreeNode } from 'react-organizational-chart';
import { useAppSelector } from '../../../../../hooks';
import { StyleColor } from './functions/functions';
import { styles_tree, styles_tree_node } from './utils/constants';
import './styles.css';
const OrganigramVisual = (): JSX.Element => {
  const { mold_organigram } = useAppSelector((state) => state.organigram);
  console.log('mold_organigram', mold_organigram);

  const renderNode = (node: any) => {
    // Check if the current node is at level 2 and has "cod_tipo_unidad" AS or AP
    if (
      node.classname === 'Nivel-2' &&
      (node.cod_tipo_unidad === 'AS' || node.cod_tipo_unidad === 'AP')
    ) {
      // Render the node at the same level as level 1
      return (
        <TreeNode
          key={node.id}
          label={
            <div
              style={{
                ...styles_tree,
                background:
                  node.cod_tipo_unidad === 'AS'
                    ? 'green'
                    : node.cod_tipo_unidad === 'AP'
                    ? 'orange'
                    : StyleColor(node.cod_agrupacion_documental),
                color: '#fff',
              }}
            >
              {node.codigo} - {node.title}
            </div>
          }
        >
          {node.children.map(renderNode)}
        </TreeNode>
      );
    }

    // Check if child's classname indicates a different level
    if (
      node.children.length > 0 &&
      node.classname !== node.children[0].classname
    ) {
      // Render child one level up
      return (
        <TreeNode
          key={node.id}
          label={
            <div
              style={{
                ...styles_tree,
                background:
                  node.cod_tipo_unidad === 'AS'
                    ? 'green'
                    : node.cod_tipo_unidad === 'AP'
                    ? 'orange'
                    : StyleColor(node.cod_agrupacion_documental),
                color: '#fff',
              }}
            >
               {node.codigo} - {node.title}
            </div>
          }
        >
          {node.children.map(renderNode)}
        </TreeNode>
      );
    }

    // Continue rendering normally for other nodes
    return (
      <TreeNode
        key={node.id}
        label={
          <div
            style={{
              ...styles_tree,
              background:
                node.cod_tipo_unidad === 'AS'
                  ? 'green'
                  : node.cod_tipo_unidad === 'AP'
                  ? 'orange'
                  : StyleColor(node.cod_agrupacion_documental),

              color: '#fff',
              padding: '.4rem',
            }}
          >
             {node.codigo} - {node.title}
          </div>
        }
      >
        {node.children.map(renderNode)}
      </TreeNode>
    );
  };

  return (
    <>
      {/* Your buttons here */}
      <Tree
        lineWidth={'2px'}
        lineColor={'black'}
        lineBorderRadius={'10px'}
        label={
          <>
            <div
              style={{
                ...styles_tree_node,
                background: 'blue',
                color: '#fff',
                padding: '.4rem',
                position: 'relative', // Add this to position the span relative to this div
              }}
            >
              {mold_organigram[0]?.codigo} - {mold_organigram[0]?.title}
            </div>
            <span
              style={{
                display: 'block',
                height: '90px', // Adjust this to change the length of the line
                width: '1.3px',
                backgroundColor: 'black',
                position: 'absolute',
                top: '40px', // Position the line at the bottom of the div
                left: '50%', // Center the line
              }}
            ></span>
            <div>
              {mold_organigram[0]?.children
                .filter((el: any) => el.cod_tipo_unidad === 'AS')
                .map((el: any) => (
                  <div
                    key={el.id}
                    style={{
                      ...styles_tree_node,
                      background: 'green',
                      color: '#fff',
                      marginTop: '2rem',
                      marginLeft: '18.9rem',
                      padding: '.4rem',
                    }}
                  >
                    {el.codigo} - {el.title}
                  </div>
                ))}
            </div>

            <div>
              {mold_organigram[0]?.children
                .filter((el: any) => el.cod_tipo_unidad === 'AP')
                .map((el: any) => (
                  <div
                    key={el.id}
                    style={{
                      ...styles_tree_node,
                      background: 'orange',
                      color: '#fff',
                      marginTop: '1.2rem',
                      marginLeft: '.015rem',
                      marginRight: '.015rem',
                      padding: '.4rem',
                    }}
                  >
                    {el.codigo} - {el.title}
                  </div>
                ))}
            </div>
          </>
        }
      >
        {mold_organigram[0]?.children
          .filter(
            (el: any) =>
              !(el.cod_tipo_unidad === 'AS' || el.cod_tipo_unidad === 'AP')
          )
          .map(renderNode)}
      </Tree>
    </>
  );
};

export default OrganigramVisual;

import { Button } from '@mui/material';
import { Tree, TreeNode } from 'react-organizational-chart';
import { type ISon } from '../interfaces/organigrama';
import { useAppSelector } from '../../../../hooks';

// eslint-disable-next-line no-restricted-syntax, @typescript-eslint/explicit-function-return-type
export default function OrganigramVisual() {
  // Redux State Extraction
  const { mold_organigram } = useAppSelector(
    (state: { organigram: any }) => state.organigram
  );

  const styles_tree = {
    padding: '5px',
    border: '1px solid black',
    borderRadius: '8px',
    display: 'inline-block',
  };
  const styles_tree_node = {
    padding: '5px',
    border: '1px solid black',
    borderRadius: '8px',
    display: 'inline-block',
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function StyleColor(type: string) {
    switch (type) {
      case 'LI':
        return '#36A9E1';
      case 'AS':
        return '#91C02C';
      case 'AP':
        return '#4CAF50';
      default:
        return '#6bb22b';
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function CreateMoldOrganigram(data: ISon[]) {
    return data.map((item: any): JSX.Element => {
      return (
        // eslint-disable-next-line react/jsx-key
        <TreeNode
          key={item.id}
          label={
            <div
              style={{
                ...styles_tree,
                background: StyleColor(item.cod_tipo_unidad),
                color: '#fff',
              }}
            >
              {item.title}{' '}
            </div>
          }
        >
          {item.children.length > 0
            ? CreateMoldOrganigram(item.children)
            : null}
        </TreeNode>
      );
    });
  }
  return (
    <>
      <Button style={{ color: '#fff' }} disabled color="primary">
        Unidad de Linea
      </Button>{' '}
      <Button style={{ color: '#fff' }} disabled color="secondary">
        Unidad de Asesoria
      </Button>{' '}
      <Button style={{ color: '#fff' }} disabled color="success">
        Unidad de Apoyo
      </Button>{' '}
      <Tree
        lineWidth={'2px'}
        lineColor={'black'}
        lineBorderRadius={'10px'}
        label={
          <div
            style={{
              ...styles_tree_node,
              background: '#6bb22b',
              color: '#fff',
            }}
          >
            {mold_organigram[0].title}{' '}
          </div>
        }
      >
        {CreateMoldOrganigram(mold_organigram[0].children)}
      </Tree>
    </>
  );
}

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Grid } from '@mui/material';
import { type OverridableStringUnion } from '@mui/types';

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import FormButton from './FormButton';
import AddIcon from '@mui/icons-material/Add';

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface IProps {
  hidden_text?: boolean | null;
  initial_values?: ChipData[] | null;
  character_separator?: string | null;
  set_form?: any | null;
  keywords?: string | null;
  disabled?: boolean | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormKeywords = ({
  initial_values,
  hidden_text,
  character_separator,
  set_form,
  keywords,
  disabled,
}: IProps) => {
  const [chipData, setChipData] = useState<readonly ChipData[]>(
    initial_values ?? []
  );
  const [newChip, setNewChip] = useState('');

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  useEffect(() => {
    const labelArray = chipData.map((item) => item.label); // Extraer las etiquetas
    const labelString = labelArray.join(character_separator ?? ',');
    if (set_form ?? null !== null) {
      set_form(keywords, labelString);
    }
  }, [chipData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewChip(event.target.value);
  };

  const handleAddChip = () => {
    if (newChip.trim() !== '') {
      setChipData((chips) => [
        ...chips,
        { key: chips.length, label: newChip.trim() },
      ]);
      setNewChip('');
    }
  };
  return (
    <>
      {!(hidden_text ?? false) && (
        <Grid container spacing={2} justifyContent={'center'}>
          <Grid item xs={12} md={12}>
            <Paper
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 2,
              }}
              component="ul"
            >
              {chipData.map((data) => {
                return (
                  <ListItem key={data.key}>
                    <Chip label={data.label} onDelete={handleDelete(data)} />
                  </ListItem>
                );
              })}
            </Paper>
          </Grid>
          <Grid container justifyContent={'center'} spacing={2}>
            <Grid item xs={12} md={3} margin={0} marginTop={0}>
              <TextField
                fullWidth
                size="small"
                label="Nueva Palabra"
                value={newChip}
                onChange={handleInputChange}
                disabled={disabled ?? false}
              />
            </Grid>

            <Grid item xs={12} md={2} margin={0} marginTop={0}>
              <FormButton
                variant_button="contained"
                on_click_function={handleAddChip}
                icon_class={null}
                label={`Agregar palabra +`}
                type_button="button"
                color_button="success"
                disabled={disabled ?? false}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default FormKeywords;

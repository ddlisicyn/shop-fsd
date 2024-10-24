import { Card, CardContent, Typography } from '@mui/material';
import styled from '@emotion/styled';

const NameTypography = styled(Typography)(`
word-wrap: normal;
cursor: pointer;
margin: 0;
height: 56px;
width: 100%;
-webkit-line-clamp: 2;
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
line-height: normal;
`);

const CardContentStyleChanged = styled(CardContent)(`
padding: 0;
`);

const CardStyleChanged = styled(Card)(`
border-radius: 0;
box-shadow: none;
`);

export { NameTypography, CardContentStyleChanged, CardStyleChanged };
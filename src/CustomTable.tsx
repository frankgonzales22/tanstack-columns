import React from 'react';
import { Table, Thead, Tr, Th, Td, Tbody, Tfoot } from "@chakra-ui/react";

const CustomTableHeader: React.FC = () => {
  return (
    <Thead>
      <Tr>
        <Th colSpan={2}>Two Column Header</Th>
      </Tr>
      <Tr>
        <Th>Column 1</Th>
        <Th>Column 2</Th>
      </Tr>
    </Thead>
  );
};

const CustomTable: React.FC = () => {
  return (
    <Table variant="simple">
      <CustomTableHeader />
      <Tbody>
        <Tr>
          <Td>Row 1, Column 1</Td>
          <Td>Row 1, Column 2</Td>
        </Tr>
        <Tr>
          <Td>Row 2, Column 1</Td>
          <Td>Row 2, Column 2</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default CustomTable;
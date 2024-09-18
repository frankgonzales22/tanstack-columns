// Table.tsx
import React, { useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, IconButton, Collapse } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

type DataRow = {
  id: number;
  name: string;
  details: string;
};

const data: DataRow[] = [
  { id: 1, name: 'Item 1', details: 'Details about Item 1' },
  { id: 2, name: 'Item 2', details: 'Details about Item 2' },
  { id: 3, name: 'Item 3', details: 'Details about Item 3' },
];

const ExpandableTable: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (id: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <Box w="100%" p={4}>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(row => (
            <React.Fragment key={row.id}>
              <Tr>
                <Td>
                  <IconButton
                    icon={expandedRows.has(row.id) ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={() => toggleRow(row.id)}
                    aria-label="Toggle details"
                  />
                </Td>
                <Td>{row.name}</Td>
              </Tr>
              <Tr>
                <Td colSpan={2} p={0} borderBottom="none">
                  <Collapse in={expandedRows.has(row.id)} animateOpacity>
                    <Box p={4} bg="gray.50">
                      {row.details}
                    </Box>
                  </Collapse>
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ExpandableTable;

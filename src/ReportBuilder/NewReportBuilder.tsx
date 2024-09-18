// NewReportBuilder.tsx
import { useState } from 'react';
import { HStack } from '@chakra-ui/react';
import ExpandableTable from '../ANT D WITH REACT-TABLE/Expandable';
import { useGrossDeferredCol } from '../ANT D WITH REACT-TABLE/data';

const NewReportBuilder = () => {
    const [selectedRowDrop, setSelectedRowDrop] = useState<string[]>([]);
    const [selectedRow, setSelectedRow] = useState<any[]>([]);

    const { data, isLoading } = useGrossDeferredCol();

    const handleRow = (item: { name: string }) => {
        if (!selectedRow.includes(item.name)) {
            // If it doesn't exist, add it to selectedRow
            setSelectedRowDrop([...selectedRowDrop, item.name]);
            setSelectedRow([...selectedRow, item.name]);
        }
    }

    const handleClear = () => {
        setSelectedRowDrop([]);
        setSelectedRow([]);
    }

    if (isLoading) return <p>Loading...</p>;

    return (
        <>
            <HStack>

                {/* <Button _hover={{ cursor: 'pointer' }} onClick={handleClear}>Clear</Button>

                <Box border={'1px solid black'} w={300}>
                    <ul>
                        {data!.length > 0 &&
                            Object.keys(data![0]).map((i) => <ADraggableItem key={i} name={i} />)}
                    </ul>
                </Box>
                <Box height={'400px'}>
                    <ADroppableArea onDrop={handleRow} title='ROW' droppedItems={selectedRowDrop} setDroppedItems={setSelectedRowDrop} />
                </Box> */}
            </HStack>
            <HStack>
                <ExpandableTable />
            </HStack>
        </>
    );
}

export default NewReportBuilder;

import { DataTable } from 'mantine-datatable';
import lecture from '@/data/lecture.json';
import { ActionIcon, Container, Group, LoadingOverlay, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconDownload } from '@tabler/icons-react';
import { useScrappingData } from '../hooks';
import { notifications } from '@mantine/notifications';

const PAGE_SIZE = 10;

export function TableLecturer(){
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(lecture.slice(0, PAGE_SIZE));
  const [name, setName] = useState('');

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(lecture.slice(from, to));
  }, [page]);

  const scrappingData = useScrappingData({
    onSuccess: data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const blobURL = window.URL.createObjectURL(blob);

      const tempLink = document.createElement('a');
      tempLink.href = blobURL;
      tempLink.setAttribute('download', `${name}_research.xlsx`);
      tempLink.click();

      window.URL.revokeObjectURL(blobURL);
      setName('');
      notifications.show({
        title: 'Success',
        message: 'Success scrapping data!',
      })
    },
    onError: (error) => {
      console.log('error',error)
      notifications.show({
        title: 'Failed',
        message: 'Failed scrapping data',
        color: 'red'
      })
    },
  })

  const donwloadData = async (username: string, name: string) => {
    setName(name)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    scrappingData.mutate(username)
  }

  return (
    <Container size="md" style={{marginTop:"4em", marginBottom: "4em"}}>
      <LoadingOverlay visible={scrappingData.isLoading} overlayBlur={2} />
      <DataTable
        striped
        withColumnBorders
        withBorder
        highlightOnHover
        fontSize='sm'
        columns={
          [
            { accessor: 'name', title: 'Nama Dosen' }, 
            {
              accessor: 'actions',
              title: <Text>Aksi</Text>,
              textAlignment: 'center',
              width: 80,
              render: (data) => (
                <Group spacing={4} position="center" noWrap>
                  <ActionIcon color="blue" onClick={() => donwloadData(data.acadastaf, data.name)}>
                    <IconDownload size={16} />
                  </ActionIcon>
                </Group>
              ),
            },
          ]
        }
        records={records}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(page) => setPage(page)}
        totalRecords={lecture.length} 
      />
    </Container>
  )
}
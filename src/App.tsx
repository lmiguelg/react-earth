import { Avatar, Typography, Box } from './ui-components/atoms'
import React, { useCallback, useMemo } from 'react'
import useFetch from './hooks/useFetch'
import { Table } from './ui-components/molecules'
import { ITableItem } from './ui-components/molecules/Table/Table'
import { IndexType } from 'typescript'

interface IRepository extends ITableItem {
  full_name: string
  description: string
}

interface IEmojis {
  anchor: string
  clock1: string
  car: string
}

function App() {
  const {
    data: repositories,
    isFetching,
    error
  } = useFetch<IRepository[]>({ url: '/users/lmiguelg/repos' })

  const { data: emojis } = useFetch<IEmojis>({
    url: '/emojis'
  })
  console.log(emojis)

  const items = useMemo(
    () =>
      repositories?.length
        ? repositories.map((repository) => ({
            id: repository.id,
            full_name: repository.full_name,
            description: repository.description || 'No description'
          }))
        : [],
    [repositories]
  )

  const updateRepositoryDescription = useCallback((item: ITableItem) => {
    // const {} = useFetch({ url: `/repos/lmiguel/${item.full_name}` })
    console.log('update description with: ', item)
  }, [])

  const titleComponent = useCallback(
    ({ name, icon = '' }: { name: string; icon?: string }) => (
      <Box display='flex'>
        <Avatar src={icon} sx={{ width: 24, height: 24 }} />
        {name}
      </Box>
    ),
    []
  )

  return (
    <div className='App'>
      <Typography variant='subtitle1'>Repos</Typography>
      <ul>
        <Table<IRepository & { full_name: any }>
          headers={{
            id: 'ID',
            full_name: titleComponent({
              name: 'Repo name',
              icon: emojis?.anchor
            }),
            description: titleComponent({
              name: 'Description',
              icon: emojis?.clock1
            })
          }}
          items={items}
          onClickRow={updateRepositoryDescription}
        />
        {isFetching && <p>Loading...</p>}
      </ul>
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default App

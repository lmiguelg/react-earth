import React, { useMemo } from 'react'
import useFetch from './hooks/useFetch'
import { Table } from './ui-components/molecules'
import { ITableItem } from './ui-components/molecules/Table/Table'

interface Repository extends ITableItem {
  full_name: string
  description: string
}

function App() {
  const {
    data: repositories,
    isFetching,
    error
  } = useFetch<Repository[]>('/users/lmiguelg/repos')

  const data = useMemo(() => {
    return repositories?.map((repository) => ({
      id: repository.id,
      full_name: repository.full_name,
      description: repository.description || 'No description'
    }))
  }, [repositories])

  return (
    <div className='App'>
      <h1>Repos</h1>
      <ul>
        <Table<Repository>
          headers={{
            id: 'ID',
            full_name: 'Repo name',
            description: 'Description'
          }}
          items={data || []}
        />
        {isFetching && <p>Loading...</p>}
      </ul>
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default App

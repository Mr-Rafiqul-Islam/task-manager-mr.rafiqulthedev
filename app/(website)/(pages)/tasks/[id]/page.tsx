import React from 'react'
import TaskDetails from './TaskDetails';
export type DetailsPageProps = Promise<{
  id:string;
}>;
export default async function DetailsPage(props: {
  params: DetailsPageProps;
}) {

  const { id } = await props.params;
  return (
    <div className='container'>
        
        <TaskDetails id={id}/>
    </div>
  )
}

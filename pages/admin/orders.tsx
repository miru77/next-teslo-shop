import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React from 'react'
import use_swr from 'swr'
import { AdminLayout } from '../../components/layouts'
import { IOrder, IUser } from '../../interfaces'


    const columns:GridColDef[] = [
        { field: 'id', headerName: 'Order ID', width: 250 },
        { field: 'email', headerName: 'Correo', width: 200 },
        { field: 'name', headerName: 'Nombre Completo', width: 200 },
        { field: 'total', headerName: 'Monto total', width: 100 },
        { field: 'isPaid', headerName: 'Pagada', width: 130,
        renderCell:({row}:GridValueGetterParams) =>{
            return row.isPaid 
                ? (<Chip variant='outlined' label="Pagada" color='success'/>)
                : (<Chip variant='outlined' label="Pendiente" color='error'/>)
        } 
    },
    { field: 'noProducts', headerName: 'No.Productos', align: 'center', width: 130 },

    { field: 'check', headerName: 'Ver Orden', width: 100,
    renderCell:({row}:GridValueGetterParams) =>{
        return (
            <a href={`/admin/orders/${row.id}`} target="_blank" rel='noreferrer'>
                Ver orden
            </a>
        )
    } 
},
{ field: 'createdAt', headerName: 'Creada en', width: 200 },


    ]

const ordersPage = () => {

    const {data, error} = use_swr<IOrder[]>('/api/admin/orders')
    if(!data && !error) {
        return <></>
      }
      if(error) {
        console.log(error)
        return <Typography>Error al cargar la Información</Typography>
      }

      const rows = data!.map(order => ({
            id:order._id,
            email:(order.user as IUser).email,
            name:(order.user as IUser).name,
            total:order.total,
            isPaid: order.isPaid,
            noProducts: order.numberOfItems,
            createdAt: order.createdAt,
      }))


  return (
   <AdminLayout title={'Ordenes'} subTitle={'Mantenimiento de ordenes'} icon={<ConfirmationNumberOutlined />}>

        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>

   </AdminLayout>
  )
}

export default ordersPage
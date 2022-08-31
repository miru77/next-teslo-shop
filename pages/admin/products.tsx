import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import {  Box, Button, CardMedia, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React from 'react'
import use_swr from 'swr'
import { AdminLayout } from '../../components/layouts'
import {  IProduct } from '../../interfaces'
import NextLink from 'next/link';


    const columns:GridColDef[] = [
        { field: 'img', headerName: 'Foto',
        renderCell:({row}:GridValueGetterParams) =>{
            return (
                <a href={`/product/${row.slub}`} target="_blank" rel='noreferrer'>
                   <CardMedia 
                        component='img'
                        className='fadeIn'
                        alt={row.title}
                        image={row.img}
                   />
                </a>
            )
        } 
    },

        { field: 'title', headerName: 'Title', width: 250,
        renderCell:({row}:GridValueGetterParams) =>{
            return (
               <NextLink href={`/admin/products/${row.slub}`} passHref>
                    <Link underline='always'>
                        {row.title}
                    </Link>
               </NextLink>
            )
        } 

    },
        { field: 'gender', headerName: 'Género' },
        { field: 'type', headerName: 'Tipo' },
        { field: 'inStock', headerName: 'Inventario' },
        { field: 'price', headerName: 'Precio' },
        { field: 'sizes', headerName: 'Tallas', width: 250 },


    ]

const ProductsPage = () => {

    const {data, error} = use_swr<IProduct[]>('/api/admin/products')
    if(!data && !error) {
        return <></>
      }
      if(error) {
        console.log(error)
        return <Typography>Error al cargar la Información</Typography>
      }

      const rows = data!.map(product => ({
            id:product._id,
            img: product.images[0],
            title:product.title,
            gender:product.gender,
            type: product.type,
            inStock: product.inStock,
            price: product.price,
            sizes: product.sizes.join(', '),
            slub: product.slug,

      }))


  return (
   <AdminLayout title={`Productos(${data?.length})`} subTitle={'Mantenimiento de productos'} 
   icon={<CategoryOutlined />}>

    <Box display='flex' justifyContent='end' sx={{mb:2}}>
        <Button
            startIcon={<AddOutlined />}
            color="secondary"
            href="/admin/products/new"
        >
            Crear producto
        </Button>
    </Box>

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

export default ProductsPage
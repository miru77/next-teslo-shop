import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import {  Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { SummaryTile } from '../../components/admin'
import { AdminLayout } from '../../components/layouts'
import { DashboarSummaryResponse } from '../../interfaces'

const DashboardPage = () => {

  const {data, error} = useSWR<DashboarSummaryResponse>('/api/admin/dashboard',{
    refreshInterval: 30 * 1000 // 30 segundos
  })

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
      const interval = setInterval(() => {
        console.log('Tick')
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1 : 30)
      }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  

  if(!data && !error) {
    return <></>
  }
  if(error) {
    console.log(error)
    return <Typography>Error al cargar la Información</Typography>
  }

const {     numberOfOrders,
            paidOrders,
            numberOfClients,
            numberOfProducts,
            productsWithNoInventory,
            lowInventiry,
            notPaidOrders,
          } = data!;

  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={<DashboardOutlined />}
    >

        <Grid container spacing={2}>
            <SummaryTile 
                title={numberOfOrders}
                subtitle="Ordenes Totales"
                icon={<CreditCardOffOutlined  color="secondary" sx={{fontSize:40}}/>}
            />
              <SummaryTile 
                title={paidOrders}
                subtitle="Ordenes Pagadas"
                icon={<AttachMoneyOutlined  color="success" sx={{fontSize:40}}/>}
            />
             <SummaryTile 
                title={notPaidOrders}
                subtitle="Ordenes Pendientes"
                icon={<CreditCardOffOutlined  color="error" sx={{fontSize:40}}/>}
            />
                <SummaryTile 
                title={numberOfClients}
                subtitle="Clientes"
                icon={<GroupOutlined  color="primary" sx={{fontSize:40}}/>}
            />
              <SummaryTile 
                title={numberOfProducts}
                subtitle="Productos"
                icon={<CategoryOutlined  color="warning" sx={{fontSize:40}}/>}
            />
              <SummaryTile 
                title={productsWithNoInventory}
                subtitle="Sin Existencia"
                icon={<CancelPresentationOutlined  color="error" sx={{fontSize:40}}/>}
            />
              <SummaryTile 
                title={lowInventiry}
                subtitle="Bajo Inventario"
                icon={<ProductionQuantityLimitsOutlined  color="warning" sx={{fontSize:40}}/>}
            />
              <SummaryTile 
                title={refreshIn}
                subtitle="Actialización en:"
                icon={<AccessTimeOutlined  color="secondary" sx={{fontSize:40}}/>}
            />

        </Grid>
    </AdminLayout>
  )
}

export default DashboardPage
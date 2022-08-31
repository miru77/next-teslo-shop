import { PeopleOutline } from '@mui/icons-material'
import React ,{useState, useEffect} from 'react'
import { AdminLayout } from '../../components/layouts'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, MenuItem, Select, Typography } from '@mui/material';
import use_swr from 'swr';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';

const UsPage = () => {


    const {data, error} = use_swr<IUser[]>('/api/admin/users')
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        if(data) {
            setUsers(data)
        }
    }, [data])
    

    if(!data && !error) {
        return <></>
      }
      if(error) {
        console.log(error)
        return <Typography>Error al cargar la Información</Typography>
      }

      const onRoleUpdated =  async(userId: string, newRole: string) => {

        const previosUsers = users.map(user => ({...user}))
        const updatedUsers = users.map(user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }))

        setUsers(updatedUsers)

        try {
            await tesloApi.put('/admin/users', {userId, role: newRole})
        } catch (error) {
            setUsers(previosUsers)
            console.log(error)
            alert('No se pudo actualizar el rol del usuario')
        }
      }

    const columns:GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre Completo', width: 300 },
        { field: 'role', headerName: 'rol', width: 300,
            renderCell:({row}:GridValueGetterParams) => {
                return (
                    <Select
                        value={row.role}
                        label="Rol"
                        onChange={({target})=> onRoleUpdated(row.id, target.value )}
                        sx={{width:'300px'}}
                    >
                        <MenuItem value='admin'>Admin</MenuItem>     
                        <MenuItem value='client'>Client</MenuItem>     
                        <MenuItem value='super-user'>Super User</MenuItem>     
                        <MenuItem value='SEO'> SEO </MenuItem>     
                    </Select>
                )
            }
    },

    ];

    const rows = users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))

    

  return (


   <AdminLayout title={'Usuarios'} subTitle={'Mantenimieto de usuarios'} icon={<PeopleOutline />}    
   >

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

export default UsPage
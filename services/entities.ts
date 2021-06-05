// Custom imports
import axios from '@/services/axios';

// Get the entities from user's project
export const getEntities = (bucket: string = 'tfg') => {
    return axios.get(`/entities?bucket=${bucket}`).then(({ status, data }) => {
        if (status === 200) {
            return data;
        }
    });
};

// Get the data of a given type of entity
export const getEntityInstances = (id: string, bucket: string = 'tfg') => {
    return axios.get(`/entities/${id}?bucket=${bucket}`).then(({ status, data }) => {
        if (status === 200) {
            return data;
        }
    });
};

// Create an entity of a given type
export const createEntityInstance = (id: string, params: object, bucket: string = 'tfg') =>
    axios.post(`/entities/${id}?bucket=${bucket}`, params);

// Get the data of an instance of the given entity typr
export const getEntityInstance = (id: string, slug: string, bucket: string = 'tfg') => {
    return axios.get(`/entities/${id}/${slug}?bucket=${bucket}`).then(({ status, data }) => {
        if (status === 200) {
            return data;
        }
    });
};

// Delete the given entity
export const deleteEntityInstance = (id: string, slug: string, bucket: string = 'tfg') =>
    axios.delete(`/entities/${id}/${slug}?bucket=${bucket}`);

// Edit an existing entity of a given type
export const editEntityInstance = (id: string, slug: string, params: object, bucket: string = 'tfg') =>
    axios.put(`/entities/${id}/${slug}?bucket=${bucket}`, params);

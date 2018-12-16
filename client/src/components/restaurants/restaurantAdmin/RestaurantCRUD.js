import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm
} from "react-crud-table";

const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let tasks = [];

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a))
};

const getSorter = data => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === "id") {
    sorter =
      data.direction === "ascending"
        ? SORTERS.NUMBER_ASCENDING(mapper)
        : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter =
      data.direction === "ascending"
        ? SORTERS.STRING_ASCENDING(mapper)
        : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};

let count = tasks.length;
const service = {
  fetchItems: payload => {
    let result = Array.from(payload.products);
    //result = result.sort(getSorter(payload.products.sort));
    var tasks = result;
    return Promise.resolve(tasks);
  },
  create: task => {
    count += 1;
    tasks.push({
      ...task,
      id: count
    });

    axios.get(`/api/v1/get_restaurant_id`, {
      headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
      }
    }).then(res => {
      axios.post(`/api/v1/restaurants/9/products`, task, {
        headers: {
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client'),
          'access-token': localStorage.getItem('accessToken'),
          'expiry': localStorage.getItem('expiry'),
          'Content-Type': 'application/json',
        }
      })
      .then(res => {

        })
    })
    return Promise.resolve(task);
  },
  update: data => {
    // const task = tasks.find(t => t.id === data.id);
    // task.title = data.title;
    // task.description = data.description;
    axios.get(`/api/v1/get_restaurant_id`, {
      headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
      }
    }).then(res => {
       axios.put(`/api/v1/restaurants/9/products/${data.id}`, {
        name: data.name,
        description: data.description,
        price: data.price
       }, {
        headers: {
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client'),
          'access-token': localStorage.getItem('accessToken'),
          'expiry': localStorage.getItem('expiry'),
          'Content-Type': 'application/json',
        }
      })
      .then(res => {

      })
    })

    return Promise.resolve(data);
  },
  delete: data => {
    // const task = tasks.find(t => t.id === data.id);
    // tasks = tasks.filter(t => t.id !== task.id);

    axios.get(`/api/v1/get_restaurant_id`, {
      headers: {
        'uid': localStorage.getItem('uid'),
        'client': localStorage.getItem('client'),
        'access-token': localStorage.getItem('accessToken'),
        'expiry': localStorage.getItem('expiry'),
      }
    }).then(res => {
      axios.delete(`/api/v1/restaurants/9/products/${data.id}`, {
        headers: {
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client'),
          'access-token': localStorage.getItem('accessToken'),
          'expiry': localStorage.getItem('expiry'),
          'Content-Type': 'application/json',
        }
      })
      .then(res => {

      })
    })

    return Promise.resolve(data);
  }
};


export const RestaurantCRUD = (products) => (

  <div class="crud-panel">
    <CRUDTable
      caption="Products"
      fetchItems={payload => service.fetchItems(products)}
    >
      <Fields>
        <Field name="id" label="Id" hideInCreateForm />
        <Field name="name" label="Name" placeholder="Name" />
        <Field
          name="description"
          label="Description"
          render={DescriptionRenderer}
        />
        <Field name="price" label="Price" placeholder="Price" />
        <Field name="image" label="Image" placeholder="Image url"/>
      </Fields>
      <CreateForm
        title="Task Creation"
        message="Create a new task!"
        trigger="Create Task"
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "Please, provide task's title";
          }

          if (!values.description) {
            errors.description = "Please, provide task's description";
          }

          if (!values.price) {
            errors.price = "Please, provide task's price";
          }

          return errors;
        }}
      />

      <UpdateForm
        title="Task Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={values => {
          const errors = {};

          if (!values.id) {
            errors.id = "Please, provide id";
          }

          if (!values.name) {
            errors.name = "Please, provide task's title";
          }

          if (!values.description) {
            errors.description = "Please, provide task's description";
          }

          if (!values.price) {
            errors.price = "Please, provide task's price";
          }

          return errors;
        }}
      />

      <DeleteForm
        title="Task Delete Process"
        message="Are you sure you want to delete the task?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={values => {
          const errors = {};
          if (!values.id) {
            errors.id = "Please, provide id";
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);


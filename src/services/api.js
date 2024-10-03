const baseUrl = process.env.REACT_APP_SERVER;

export const getAllTasks = async () => {
  try {
    const response = await fetch(baseUrl);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getTask = async id => {
  try {
    const response = await fetch(`${baseUrl}${id}/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    return { response, result };
  } catch (err) {
    console.log(err);
  }
};

export const createTask = async data => {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        description: data.caption,
        completed: data.completed,
      }),
    });

    const result = await response.json();
    return { response, result };
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async id => {
  try {
    const response = await fetch(`${baseUrl}${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return { response };
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async (data,id) => {
  try {
    const response = await fetch(`${baseUrl}${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        description: data.caption,
        completed: data.completed,
      }),
    });

    const result = await response.json();

    return { response, result };
  } catch (err) {
    console.log(err);
  }
};

import React from "react";
import { useForm } from "react-hook-form";

export default ({onValidAddress, submitButton}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    onValidAddress(data);
  }

  return (
    <form className="card-text" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" {...register("name", { required: true })} />
          </div>
          <div className="mb-3">
            <label htmlFor="address1" className="form-label">Address</label>
            <input type="text" className="form-control" id="address1" {...register("address1", { required: true })} />
          </div>
          <div className="mb-3">
            <label htmlFor="address2" className="form-label">Apt / Suite / Unit / etc. (optional)</label>
            <input type="text" className="form-control" id="address2" {...register("address2")} />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email (optional)</label>
            <input type="text" className="form-control" id="email" {...register("email")} />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone (optional)</label>
            <input type="text" className="form-control" id="phone" {...register("phone")} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" className="form-control" id="city" {...register("city", { required: true })} />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <input type="text" className="form-control" id="state" {...register("state", { required: true })} />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="zip" className="form-label">Zip</label>
            <input type="text" className="form-control" id="zip" {...register("zip", { required: true })} />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="country" className="form-label">Country</label>
        <input type="text" className="form-control" id="country" {...register("country", { required: true })} />
      </div>
      {submitButton || <button type="submit" className="btn btn-primary">Next</button>}
    </form>
  );
}

import React from "react";
import { useForm } from "react-hook-form";

export default ({onValidParcel}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => {
    onValidParcel(data);
  }

  return (
    <div className="card" id="parcel">
      <div className="card-body">
        <h5 className="card-title">Parcel</h5>
        <form className="card-text" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="length" className="form-label">Length</label>
                <input type="text" className="form-control" id="length" {...register("length", { required: true })} />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="width" className="form-label">Width</label>
                <input type="text" className="form-control" id="width" {...register("width", { required: true })} />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="height" className="form-label">Height</label>
                <input type="text" className="form-control" id="height" {...register("height", { required: true })} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="pounds" className="form-label">Pounds</label>
                <input type="text" className="form-control" id="pounds" {...register("pounds", { required: true })} />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label htmlFor="oz" className="form-label">Oz</label>
                <input type="text" className="form-control" id="oz" {...register("oz", { required: true })} />
              </div>
            </div>
          </div>
          <select className="form-select" {...register("package", { required: true })} >
            <option value="flat">USPS Flat</option>
            <option value="envelope">Envelope</option>
            <option value="box">Box</option>
          </select>
          <div>&nbsp;</div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="signature" {...register("signature")} />
            <label className="form-check-label" htmlFor="signature">
              Signature Confirmation
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="hazmat" {...register("hazmat")} />
            <label className="form-check-label" htmlFor="hazmat">
              Hazardous Materials
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Get Rates</button>
        </form>
      </div>
    </div>
  );
}

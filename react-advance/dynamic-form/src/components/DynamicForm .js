import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

export default function AdvancedDynamicForm() {
  const [fields, setFields] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    setValue,
    trigger,
    control,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const dummyData = [
      { label: "Username", name: "username", type: "text", required: true, validation: "string", minLength: 3 },
      { label: "Email", name: "email", type: "email", required: true, validation: "email" },
      { label: "Age", name: "age", type: "number", required: false, validation: "number", min: 1, max: 100 },
      { label: "Gender", name: "gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
      { label: "Bio", name: "bio", type: "textarea", required: false, validation: "string" },
      { label: "Accept Terms", name: "terms", type: "checkbox", required: true },
      { label: "Role", name: "role", type: "radio", required: true, options: ["Admin", "User", "Guest"] },
    ];
    setFields(dummyData);

    // ---------- API version (commented) ----------
    /*
    const fetchSchema = async () => {
      try {
        const res = await axios.get("https://mocki.io/v1/YOUR_API_ENDPOINT");
        setFields(res.data);
      } catch (error) {
        console.error("Error fetching schema:", error);
      }
    };
    fetchSchema();
    */
   
  }, []);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted! Check console.");
    reset();
  };

  const getValidationRules = (field) => {
    const rules = {};
    if (field.required) rules.required = `${field.label} is required`;

    if (field.validation === "email") {
      rules.pattern = { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" };
    }

    if (field.validation === "number") {
      rules.min = field.min ?? undefined;
      rules.max = field.max ?? undefined;
      rules.pattern = { value: /^[0-9]+$/, message: "Only numbers allowed" };
    }

    if (field.validation === "string") {
      rules.minLength = field.minLength ?? undefined;
      rules.maxLength = field.maxLength ?? undefined;
      rules.pattern = { value: /^[A-Za-z ]+$/, message: "Only alphabets allowed" };
    }

    return rules;
  };

  const renderField = (field) => {
    switch (field.type) {
      case "textarea":
        return <textarea {...register(field.name, getValidationRules(field))} style={inputStyle(field)} />;
      case "select":
        return (
          <Controller
            name={field.name}
            control={control}
            rules={getValidationRules(field)}
            render={({ field: controllerField }) => (
              <Select
                {...controllerField}
                options={field.options.map((opt) => ({ value: opt, label: opt }))}
                onChange={(val) => controllerField.onChange(val.value)}
              />
            )}
          />
        );
      case "checkbox":
        return <input type="checkbox" {...register(field.name, getValidationRules(field))} />;
      case "radio":
        return field.options.map((opt) => (
          <label key={opt} style={{ marginRight: "10px" }}>
            <input type="radio" value={opt} {...register(field.name, getValidationRules(field))} /> {opt}
          </label>
        ));
      default:
        return <input type={field.type} {...register(field.name, getValidationRules(field))} style={inputStyle(field)} />;
    }
  };

  const inputStyle = (field) => ({
    width: field.type === "checkbox" ? "auto" : "100%",
    padding: "8px",
    border: errors[field.name] ? "1px solid red" : "1px solid #ccc",
    borderRadius: "4px",
  });

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Advanced Dynamic Form</h2>
      <p>Dirty: {isDirty.toString()}, Valid: {isValid.toString()}, Submitting: {isSubmitting.toString()}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <div key={field.name} style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              {field.label} {field.required && "*"}
            </label>
            {renderField(field)}
            {errors[field.name] && (
              <p style={{ color: "red", fontSize: "12px" }}>{errors[field.name].message}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

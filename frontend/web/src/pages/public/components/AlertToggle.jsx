import { Switch } from "@headlessui/react";

const AlertToggle = ({ isActive, onChange, loading = false }) => {
  return (
    <Switch
      checked={isActive}
      onChange={onChange}
      disabled={loading}
      className={`${isActive ? "bg-blue-500" : "bg-gray-200"} 
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50`}
    >
      <span className="sr-only">Toggle alert</span>
      <span
        className={`${isActive ? "translate-x-6" : "translate-x-1"} 
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform disabled:cursor-not-allowed disabled:opacity-50`}
      />
    </Switch>
  );
};

export default AlertToggle;

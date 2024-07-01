const { config } = require("process");

const GoogleServices =
  process.env.google_services_json || "./google-services.json";

const ApiUrl = process.env.EXPO_PUBLIC_API_URL;
const SupabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SupabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

module.exports = ({ config }) => {
  return {
    ...config,
    android: {
      package: "com.ed0811.NURSE",
      googleServicesFile: GoogleServices,
    },
    extra: {
      EXPO_PUBLIC_API_URL: ApiUrl,
      EXPO_PUBLIC_SUPABASE_URL: SupabaseUrl,
      EXPO_PUBLIC_SUPABASE_KEY: SupabaseKey,
      eas: {
        projectId: "23520d76-6ffa-493d-a415-c64871402fa8",
      },
    },
  };
};

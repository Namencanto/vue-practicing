export default defineEventHandler(async (event) => {
  const { code } = event.context.params;

  const { currencyKey } = useRuntimeConfig();

  const { data } = await $fetch(
    `https://api.currencyapi.com/v3/latest?currencies=${code}&apiKey=${currencyKey}`
  );

  return data;
});

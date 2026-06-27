export async function getServerSideProps({ params }) {
  const { id } = params;
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const product = await res.json();
    return { props: { product } };
  } catch (error) {
    console.error('❌ Product fetch error:', error.message);
    return { props: { product: null } };
  }
}
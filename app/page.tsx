// app/page.tsx
import Link from "next/link";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Home
      </Typography>
      <Link href="/users" style={{ textDecoration: "underline" }}>
        Go to /users
      </Link>
    </Box>
  );
}

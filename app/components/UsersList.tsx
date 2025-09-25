// components/UsersList.tsx
"use client";

import * as React from "react";
import {
  Card, CardActionArea, CardContent, Avatar, Stack, TextField,
  InputAdornment, Box, Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type UserItem = { id: number; name: string; avatar: string };

const USERS: UserItem[] = [
  { id: 1, name: "Ali",     avatar: "https://ui-avatars.com/api/?name=Ali&background=random" },
  { id: 2, name: "Bob",     avatar: "https://ui-avatars.com/api/?name=Bob&background=random" },
  { id: 3, name: "Cecilia", avatar: "https://ui-avatars.com/api/?name=Cecilia&background=random" },
  { id: 4, name: "David",   avatar: "https://ui-avatars.com/api/?name=David&background=random" },
];

export default function UsersList() {
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return USERS;
    return USERS.filter((u) => u.name.toLowerCase().includes(s));
  }, [q]);

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 }, width: "100%" }}>
      <Stack spacing={3} alignItems="stretch">
        <Typography variant="h5" fontWeight={700}>Users</Typography>

        <TextField
          placeholder="Search users…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* CSS Grid – oddiy va barqaror */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((user) => (
            <div key={user.id}>
              <Card sx={{ height: "100%", borderRadius: 2 }}>
                <CardActionArea sx={{ height: "100%" }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar src={user.avatar} alt={user.name} sx={{ width: 56, height: 56 }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>{user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">ID: {user.id}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ gridColumn: "1 / -1" }}>
              <Box
                sx={{
                  py: 6,
                  textAlign: "center",
                  border: "1px dashed",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Typography>No users found</Typography>
              </Box>
            </div>
          )}
        </div>
      </Stack>
    </Box>
  );
}

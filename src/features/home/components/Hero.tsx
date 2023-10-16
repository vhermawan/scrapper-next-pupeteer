import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from '@/assets/img/image.svg';
import classes from '@/styles/HeroBullets.module.css';

export function HeroSection() {
  return (
    <Container size="md" style={{marginTop:"10em"}}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>scrapper</span> website <br /> library
          </Title>
          <Text c="dimmed" mt="md">
            Build fully functional accessible web applications to scrapp data for publication in Acadastaff UGM
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>TypeScript based</b> – build type safe applications with Next Js, Pupeteer, and Vercel
            </List.Item>
            <List.Item>
              <b>Free and open source</b> – all packages have MIT license, you can use this project
              to make your another scrapper
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
            <Button variant="default" radius="xl" size="md" className={classes.control}>
              Source code
            </Button>
          </Group>
        </div>
        <Image src={image.src} className={classes.image} />
      </div>
    </Container>
  );
}
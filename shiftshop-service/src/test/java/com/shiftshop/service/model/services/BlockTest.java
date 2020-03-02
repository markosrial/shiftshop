package com.shiftshop.service.model.services;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.Assert.*;

public class BlockTest {

    @Test
    public void testGetsAndHashCode() {

        String test1 = "test1";
        String test2 = "test2";

        Block<String> block1 = new Block<>(new ArrayList<>(Arrays.asList(test1, test2)), false);
        Block<String> block2 = new Block<>(new ArrayList<>(Arrays.asList(test1, test2)), false);

        assertEquals(block1.hashCode(), block2.hashCode());
        assertEquals(block1.getItems(), block2.getItems());
        assertEquals(block1.getExistMoreItems(), block2.getExistMoreItems());

    }

    @Test
    public void testEquals() {

        String test1 = "test1";
        String test2 = "test2";
        String test3 = "test3";

        Block<String> block1 = new Block<>(new ArrayList<>(Arrays.asList(test1, test2)), false);
        Block<String> block2 = new Block<>(new ArrayList<>(Arrays.asList(test1, test2)), false);
        Block<String> block3 = new Block<>(new ArrayList<>(Arrays.asList(test1, test2)), true);
        Block<String> block4 = new Block<>(null, false);
        Block<String> block5 = new Block<>(new ArrayList<>(Arrays.asList(test2, test3)), false);

        assertTrue(block1.equals(block1));
        assertTrue(block1.equals(block2));
        assertFalse(block1.equals(null));
        assertFalse(block1.equals(""));
        assertFalse(block1.equals(block3));
        assertFalse(block1.equals(block4));
        assertFalse(block4.equals(block5));

    }

}

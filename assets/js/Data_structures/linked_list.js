/** A single node of a linked list. Contains data
 * and a reference to the next node.
 */
class ListNode {
  /**
   * Creates a new node containing the given data.
   * The next node is set to undefined and gets updated
   * by the LinkedList class.
   * @param {number} data - The data stored by this node.
   */
  constructor(data) {
    this.data = data;
    this.next = undefined;
  }
}

const head = Symbol("head");
const tail = Symbol("tail");
/** An implementation of the linked list datastructure */
class LinkedList {
  constructor() {
    this[head] = null;

    // keeping track of the tail allows
    // the linked list to append elements
    // in O(1) time instead of O(n)
    this[tail] = null;
    this.length = 0;
  }

  /**
   * A function for inserting a node at a given index.
   * @param {number} data - The data the new node contains.
   * @param {number} pos - The index at which the node should be inserted.
   */
  async insert(data, pos) {
    await resetColors();
    const node = new ListNode(data);
    let coords = [pos * 150 + 50, 50];
    if (this[head] == undefined) {
      // the node is the first node of the newly created linked list
      // -> update head, tail and length
      this[head] = node;
      this[tail] = node;
      await newNode(coords, data, pos);
      this.length++;
    } else {
      await highlightCode(1, 200);

      // there's at least one node in the linked list
      switch (pos) {
        // insert the new node at the specified position
        case 0:
          await this.addNewHead(node, data);
          this.length++;
          break;
        case this.length:
          await this.addNewTail(node, data, pos, coords);
          this.length++;
          break;
        default:
          await this.addNewMidNode(node, data, pos, coords);
          this.length++;
          break;
      }
    }
    console.log(this[head]);
  }

  /**
   * Adds a new head to the linked list.
   * @param {Object} node - The new node
   * @param {number} data - The data contained in the node
   */
  async addNewHead(node, data) {
    await highlightCode(2, 200);

    // new node is the new head
    node.next = this[head];
    this[head] = node;
    await highlightCode(3);

    await animateNewHead(data);

    await highlightCode(4, 200);
  }

  /**
   * Adds a new tail to the linked list.
   * @param {Object} node - The new node
   * @param {number} data - The data contained in the node
   * @param {number} pos - The index of the node
   * @param {number[]} coords - The coordinates of the node
   */
  async addNewTail(node, data, pos, coords) {
    await highlightCode(5, 200);

    //new node is the new tail
    this[tail].next = node;
    this[tail] = node;
    coords = [pos * 150 + 50, 50];
    await highlightCode(6);
    await newNode(coords, data, pos);
    await highlightCode(7);
    await newArrow(
      { x: (pos - 1) * 150 + 50, y: 50 },
      { x: pos * 150 + 50, y: 50 },
      false
    );
  }

  /**
   * Adds a node at a specified index.
   * @param {Object} node - The new node
   * @param {number} data - The data contained in the node
   * @param {number} pos - The index of the node
   * @param {number[]} coords - The coordinates of the node
   */
  async addNewMidNode(node, data, pos, coords) {
    await highlightCode(8, 200);

    // new node is inserted somewhere in the list
    let current = this[head];
    await highlightCode(9);
    await timeout(10);
    let index = 0;
    await highlightCode(10, 200);

    await highlight(index, "#CC1616", false);
    [index, current] = await getIndexAndCurrent(index, pos - 1, current);
    await highlight(index, "#CC1616", false);
    await newMidNode(pos, data);
    node.next = current.next;
    current.next = node;
  }

  /**
   * Function to find the index of a node containing a given value in the linked list, if it exists.
   * @param {number} data - The data you're looking for
   * @returns {number} - The index of the node or -1 if it doesn't exist.
   */
  async search(data) {
    await resetColors();
    const NOT_FOUND = -1;

    await highlightCode(1, 200);
    let current = this[head];

    await highlightCode(2, 200);
    let index = 0;

    await highlightCode(3, 200);
    while (current.data != data) {
      await highlightCode(4);
      await highlight(index, "#CC1616", false);
      if (current.next == null) {
        await highlightCode(5, 200);
        return NOT_FOUND;
      }
      await highlightCode(6, 200);
      current = current.next;
      await highlightCode(7, 200);

      index++;
    }

    await highlightCode(8, 200);
    await highlight(index, "#0DC1D9", true);
    return index;
  }

  /**
   * Function for removing an element from the list.
   * @param {number} pos - The index of the element that should be removed.
   */
  async remove(pos) {
    await resetColors();
    await highlightCode(1, 200);

    switch (pos) {
      // removing head
      case 0:
        await this.deleteHead(pos);
        this.length--;
        break;
      // removing tail
      case this.length - 1:
        await this.deleteTail(pos);
        this.length--;
        break;
      // removing node somewhere in the list
      default:
        await this.deleteMidNode(pos);
        this.length--;
        break;
    }
    console.log(this[head]);
  }
  async deleteHead(pos) {
    await highlightCode(2, 200);

    data_set.delete(this[head].data);
    await highlightCode(3);
    this[head] = this[head].next;
    // delete outgoing arrow
    await removeArrow(pos);
    // delete head
    await deleteNode(pos);
    // move all nodes 1 place to the left
    await pullNodes(pos + 1);

    data_nodes.splice(pos, 1);
  }

  async deleteTail(pos) {
    await highlightCode(4, 200);

    await highlightCode(5, 200);

    let current = this[head];
    await highlightCode(6, 200);

    let index = 0;
    await highlightCode(7, 200);

    // loop over linked list to find predecessor of tail
    while (current.next != this[tail]) {
      await highlightCode(8);
      current = current.next;
      await highlight(index, "#CC1616", false);
      await highlightCode(9, 200);

      index++;
    }

    data_set.delete(this[tail].data);

    current.next = undefined;

    this[tail] = current;

    // highlight predecessor
    await highlight(index, "#CC1616", false);
    await highlightCode(10);
    //remove outgoing arrow
    await removeArrow(index);
    // delete tail
    await deleteNode(pos);
    await highlightCode(11, 200);

    data_nodes.splice(pos, 1);
  }

  async deleteMidNode(pos) {
    await highlightCode(12, 200);

    await highlightCode(13, 200);

    let curr = this[head];
    await highlightCode(14, 200);

    let i = 0;
    await highlightCode(15, 200);

    // looping through the list until preceding node is found
    await highlight(i, "#CC1616", false);
    [i, curr] = await getIndexAndCurrent(i + 1, pos, curr);

    data_set.delete(curr.next.data);
    let nextNext = curr.next.next;
    curr.next = nextNext;
    data_nodes.splice(pos, 1);

    // highlighting predecessor
    await highlight(i, "#CC1616", false);
    await highlightCode(18);
    // removing outgoing arrow from target node
    await removeArrow(pos);

    // calculating coordinates of predecessor
    // and successor of target node
    let start = [(pos - 1) * 150 + 50, 50];
    let end = [(pos + 1) * 150 + 50, 50];

    await highlightCode(19);
    // rerouting predecessor's arrow to successor
    await rerouteArrow("#path" + (pos - 1), start, end);
    // deleting target nodes
    await deleteNode(pos);
    // moving succeeding nodes & arrows 1 position to the left
    await pullNodes(pos + 1);

    // calculating new end coordinates
    // for previously rerouted arrow
    end = [pos * 150 + 50, 50];

    // smoothly scaling that arrow to new length
    await slideArrow("#path" + (pos - 1), start, end);
  }
}
